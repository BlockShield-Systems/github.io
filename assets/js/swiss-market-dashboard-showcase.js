(() => {
  const initializeSwissMarketDashboardShowcase = () => {
    const video = document.querySelector("[data-smd-brand-video]");
    const toggle = document.querySelector("[data-smd-video-toggle]");

    if (!video || !toggle) return;

    if (video.dataset.smdInitialized === "true") return;
    video.dataset.smdInitialized = "true";

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let isInView = false;
    let userPaused = false;
    let playbackMonitor = 0;

    const isActuallyPlaying = () =>
      !video.paused &&
      !video.ended &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;

    const updateToggle = () => {
      const isPlaying = isActuallyPlaying();

      toggle.textContent = isPlaying ? "Pause animation" : "Play animation";
      toggle.setAttribute("aria-pressed", String(isPlaying));
    };

    const revealFirstFrame = () => {
      try {
        if (video.currentTime === 0 && video.duration > 0.1) {
          video.currentTime = 0.01;
        }
      } catch {
        // Some browsers may block setting currentTime before metadata is ready.
      }
    };

    const startPlaybackMonitor = () => {
      window.clearInterval(playbackMonitor);

      let lastTime = video.currentTime;

      playbackMonitor = window.setInterval(() => {
        const hasProgressed = video.currentTime !== lastTime;
        lastTime = video.currentTime;

        if (!hasProgressed && isInView && !userPaused && !motionQuery.matches) {
          void tryPlay();
        }

        updateToggle();
      }, 1200);
    };

    const tryPlay = async ({ manual = false } = {}) => {
      if (!manual && motionQuery.matches) {
        video.pause();
        updateToggle();
        return;
      }

      if (!manual && (!isInView || userPaused)) {
        updateToggle();
        return;
      }

      try {
        video.muted = true;
        video.playsInline = true;

        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          video.load();
        }

        revealFirstFrame();

        await video.play();
        startPlaybackMonitor();
      } catch {
        // Browser autoplay policies can still block playback.
        // The manual button remains the fallback.
      } finally {
        updateToggle();
      }
    };

    const pauseVideo = () => {
      video.pause();
      updateToggle();
    };

    toggle.addEventListener("click", async () => {
      if (video.paused) {
        userPaused = false;
        isInView = true;
        await tryPlay({ manual: true });
      } else {
        userPaused = true;
        pauseVideo();
      }
    });

    video.addEventListener("loadedmetadata", () => {
      revealFirstFrame();
      updateToggle();
    });

    video.addEventListener("canplay", () => {
      if (isInView && !userPaused && !motionQuery.matches) {
        void tryPlay();
      }
    });

    video.addEventListener("playing", updateToggle);
    video.addEventListener("play", updateToggle);
    video.addEventListener("pause", updateToggle);
    video.addEventListener("ended", updateToggle);
    video.addEventListener("error", updateToggle);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;

          if (isInView) {
            void tryPlay();
          } else {
            pauseVideo();
          }
        },
        {
          threshold: 0.2,
        },
      );

      observer.observe(video);
    } else {
      isInView = true;
      void tryPlay();
    }

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        userPaused = true;
        pauseVideo();
        return;
      }

      userPaused = false;

      if (isInView) {
        void tryPlay();
      }
    };

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", handleMotionPreferenceChange);
    }

    window.setTimeout(() => {
      if (!userPaused) {
        isInView = true;
        void tryPlay();
      }
    }, 600);

    updateToggle();
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeSwissMarketDashboardShowcase,
    );
  } else {
    initializeSwissMarketDashboardShowcase();
  }

  document.addEventListener(
    "smd-showcase:ready",
    initializeSwissMarketDashboardShowcase,
  );
})();
