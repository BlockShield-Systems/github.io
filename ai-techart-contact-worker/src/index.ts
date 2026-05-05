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
	honeypot?: string;
}

const allowedOrigins = [
	'https://ai-techart.com',
	'https://www.ai-techart.com',
	'http://localhost:5173'
] as const;

function jsonResponse(
	body: Record<string, unknown>,
	status = 200,
	origin?: string
): Response {
	const headers = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'X-Content-Type-Options': 'nosniff',
		'Cache-Control': 'no-store',
		'Referrer-Policy': 'no-referrer',
		'Vary': 'Origin',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	if (origin && allowedOrigins.includes(origin as (typeof allowedOrigins)[number])) {
		headers.set('Access-Control-Allow-Origin', origin);
	}

	return new Response(JSON.stringify(body), {
		status,
		headers
	});
}

function isValidEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePayload(payload: Partial<ContactPayload>): Partial<ContactPayload> {
	return {
		name: typeof payload.name === 'string' ? payload.name.trim() : payload.name,
		email: typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : payload.email,
		topic: typeof payload.topic === 'string' ? payload.topic.trim() : payload.topic,
		stage: typeof payload.stage === 'string' ? payload.stage.trim() : payload.stage,
		message: typeof payload.message === 'string' ? payload.message.trim() : payload.message,
		privacyAccepted: payload.privacyAccepted === true,
		honeypot: typeof payload.honeypot === 'string' ? payload.honeypot.trim() : payload.honeypot
	};
}

function validatePayload(payload: Partial<ContactPayload>): string | null {
	if (!payload.name) {
		return 'Name is required.';
	}

	if (payload.name.length > 100) {
		return 'Name is too long.';
	}

	if (!payload.email || !isValidEmail(payload.email)) {
		return 'A valid email address is required.';
	}

	if (payload.email.length > 254) {
		return 'Email is too long.';
	}

	if (!payload.topic) {
		return 'Topic is required.';
	}

	if (payload.topic.length > 120) {
		return 'Topic is too long.';
	}

	if (!payload.stage) {
		return 'Project stage is required.';
	}

	if (payload.stage.length > 120) {
		return 'Project stage is too long.';
	}

	if (!payload.message) {
		return 'Message is required.';
	}

	if (payload.message.length < 10) {
		return 'Message is too short.';
	}

	if (payload.message.length > 5000) {
		return 'Message is too long.';
	}

	if (!payload.privacyAccepted) {
		return 'Privacy acceptance is required.';
	}

	if (payload.honeypot) {
		return 'Invalid request.';
	}

	return null;
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const origin = request.headers.get('Origin') ?? undefined;
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			if (!origin || !allowedOrigins.includes(origin as (typeof allowedOrigins)[number])) {
				return jsonResponse({ ok: false, error: 'Origin not allowed.' }, 403, origin);
			}

			if (url.pathname !== '/submit') {
				return jsonResponse({ ok: false, error: 'Not found.' }, 404, origin);
			}

			return jsonResponse({ ok: true }, 200, origin);
		}

		if (request.method !== 'POST') {
			return jsonResponse({ ok: false, error: 'Method not allowed.' }, 405, origin);
		}

		if (url.pathname !== '/submit') {
			return jsonResponse({ ok: false, error: 'Not found.' }, 404, origin);
		}

		if (!origin || !allowedOrigins.includes(origin as (typeof allowedOrigins)[number])) {
			return jsonResponse({ ok: false, error: 'Origin not allowed.' }, 403, origin);
		}

		const contentType = request.headers.get('Content-Type') ?? '';
		if (!contentType.toLowerCase().includes('application/json')) {
			return jsonResponse({ ok: false, error: 'Unsupported content type.' }, 415, origin);
		}

		let rawPayload: Partial<ContactPayload>;

		try {
			rawPayload = (await request.json()) as Partial<ContactPayload>;
		} catch {
			return jsonResponse({ ok: false, error: 'Invalid JSON payload.' }, 400, origin);
		}

		const payload = normalizePayload(rawPayload);
		const validationError = validatePayload(payload);

		if (validationError) {
			return jsonResponse({ ok: false, error: validationError }, 400, origin);
		}

		const resend = new Resend(env.RESEND_API_KEY);

		try {
			const safeName = payload.name!;
			const safeEmail = payload.email!;
			const safeTopic = payload.topic!;
			const safeStage = payload.stage!;
			const safeMessage = payload.message!;

			await resend.emails.send({
				from: env.CONTACT_FROM_EMAIL,
				to: env.CONTACT_TO_EMAIL,
				replyTo: safeEmail,
				subject: `New portfolio inquiry: ${safeTopic}`,
				text: [
					'New inquiry from ai-techart.com',
					'',
					`Name: ${safeName}`,
					`Email: ${safeEmail}`,
					`Topic: ${safeTopic}`,
					`Project stage: ${safeStage}`,
					'',
					'Message:',
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
