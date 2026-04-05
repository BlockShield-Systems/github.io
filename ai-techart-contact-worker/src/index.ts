import { Resend } from 'resend';

interface Env {
	RESEND_API_KEY: string;
	CONTACT_TO_EMAIL: string;
	CONTACT_FROM_EMAIL: string;
}

interface ContactPayload {
	name: string;
	email: string;
	topic: string;
	stage: string;
	message: string;
	privacyAccepted: boolean;
}

const allowedOrigins = [
	'https://ai-techart.com',
	'https://www.ai-techart.com',
	'http://localhost:5173'
];

function jsonResponse(
	body: Record<string, unknown>,
	status = 200,
	origin?: string
): Response {
	const headers = new Headers({
		'Content-Type': 'application/json'
	});

	if (origin && allowedOrigins.includes(origin)) {
		headers.set('Access-Control-Allow-Origin', origin);
	}

	headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type');

	return new Response(JSON.stringify(body), {
		status,
		headers
	});
}

function isValidEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: Partial<ContactPayload>): string | null {
	if (!payload.name || !payload.name.trim()) {
		return 'Name is required.';
	}

	if (!payload.email || !payload.email.trim() || !isValidEmail(payload.email.trim())) {
		return 'A valid email address is required.';
	}

	if (!payload.topic || !payload.topic.trim()) {
		return 'Topic is required.';
	}

	if (!payload.stage || !payload.stage.trim()) {
		return 'Project stage is required.';
	}

	if (!payload.message || !payload.message.trim()) {
		return 'Message is required.';
	}

	if (!payload.privacyAccepted) {
		return 'Privacy acceptance is required.';
	}

	if (payload.message.trim().length < 10) {
		return 'Message is too short.';
	}

	return null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = request.headers.get('Origin') ?? undefined;

		if (request.method === 'OPTIONS') {
			return jsonResponse({ ok: true }, 200, origin);
		}

		if (request.method !== 'POST') {
			return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405, origin);
		}

		const url = new URL(request.url);

		if (url.pathname !== '/submit') {
			return jsonResponse({ ok: false, error: 'Not found.' }, 404, origin);
		}

		if (!origin || !allowedOrigins.includes(origin)) {
			return jsonResponse({ ok: false, error: 'Origin not allowed.' }, 403, origin);
		}

		let payload: Partial<ContactPayload>;

		try {
			payload = (await request.json()) as Partial<ContactPayload>;
		} catch {
			return jsonResponse({ ok: false, error: 'Invalid JSON payload.' }, 400, origin);
		}

		const validationError = validatePayload(payload);
		if (validationError) {
			return jsonResponse({ ok: false, error: validationError }, 400, origin);
		}

		const resend = new Resend(env.RESEND_API_KEY);

		try {
			const safeName = payload.name!.trim();
			const safeEmail = payload.email!.trim();
			const safeTopic = payload.topic!.trim();
			const safeStage = payload.stage!.trim();
			const safeMessage = payload.message!.trim();

			await resend.emails.send({
				from: env.CONTACT_FROM_EMAIL,
				to: env.CONTACT_TO_EMAIL,
				replyTo: safeEmail,
				subject: `New portfolio inquiry: ${safeTopic}`,
				text: [
					`New inquiry from ai-techart.com`,
					``,
					`Name: ${safeName}`,
					`Email: ${safeEmail}`,
					`Topic: ${safeTopic}`,
					`Project stage: ${safeStage}`,
					``,
					`Message:`,
					safeMessage
				].join('\n'),
				html: `
          <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
            <h2>New portfolio inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
            <p><strong>Topic:</strong> ${escapeHtml(safeTopic)}</p>
            <p><strong>Project stage:</strong> ${escapeHtml(safeStage)}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap;">${escapeHtml(safeMessage)}</div>
          </div>
        `
			});

			return jsonResponse(
				{
					ok: true,
					message: 'Inquiry sent successfully.'
				},
				200,
				origin
			);
		} catch (error) {
			console.error('Contact submission failed:', error);

			return jsonResponse(
				{
					ok: false,
					error: 'Failed to send inquiry.'
				},
				500,
				origin
			);
		}
	}
};

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}
