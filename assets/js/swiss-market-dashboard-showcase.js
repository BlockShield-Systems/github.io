(() => {
  const video = document.querySelector("[data-smd-brand-video]");
  const toggle = document.querySelector("[data-smd-video-toggle]");

  if (!video || !toggle) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let isInView = false;
  let userPaused = false;

  const updateToggle = () => {
    const isPlaying = !video.paused && !video.ended;

    toggle.textContent = isPlaying ? "Pause animation" : "Play animation";

    toggle.setAttribute("aria-pressed", String(isPlaying));
  };

  const tryPlay = async ({ manual = false } = {}) => {
    if (!manual && motionQuery.matches) {
      updateToggle();
      return;
    }

    if (!manual && (!isInView || userPaused)) {
      updateToggle();
      return;
    }

    try {
      video.muted = true;
      await video.play();
    } catch {
      // Browser kann Playback blockieren. Kein harter Fehler nötig.
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
      await tryPlay({ manual: true });
    } else {
      userPaused = true;
      pauseVideo();
    }
  });

  video.addEventListener("play", updateToggle);
  video.addEventListener("pause", updateToggle);
  video.addEventListener("ended", updateToggle);

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
        threshold: 0.35,
      },
    );

    observer.observe(video);
  } else {
    isInView = true;
    void tryPlay();
  }

  const handleMotionPreferenceChange = () => {
    if (motionQuery.matches) {
      pauseVideo();
      return;
    }

    if (isInView && !userPaused) {
      void tryPlay();
    }
  };

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", handleMotionPreferenceChange);
  }

  updateToggle();
})();
