const http = require('http');

const agents = {
	claude: {
		name: 'Claude',
		company: 'Anthropic',
		initial: 'C',
		color: '#d97757',
		tagline: '깊이 있는 대화와 글쓰기, 복잡한 작업을 위한 AI',
		description:
			'Claude는 긴 문맥을 이해하고 자연스러운 대화를 이어가는 데 강점을 가진 AI 어시스턴트입니다. 글쓰기, 문서 요약, 아이디어 정리와 코드 작업을 차분하게 도와줍니다.',
		features: ['긴 문서와 대화 맥락 이해', '글쓰기와 요약, 아이디어 발상', '코드 설명과 문제 해결'],
	},
	codex: {
		name: 'Codex',
		company: 'OpenAI',
		initial: 'X',
		color: '#10a37f',
		tagline: '코드를 읽고, 만들고, 개선하는 AI 코딩 에이전트',
		description:
			'Codex는 소프트웨어 개발 작업을 돕는 코딩 에이전트입니다. 코드베이스를 살펴보고 기능을 구현하거나 버그를 수정하는 등 개발 흐름에 필요한 작업을 지원합니다.',
		features: ['코드 작성과 리팩터링 지원', '버그 분석과 수정 제안', '개발 작업을 단계별로 진행'],
	},
	copilot: {
		name: 'Copilot',
		company: 'GitHub',
		initial: '⌘',
		color: '#6875f5',
		tagline: '코드 작성부터 개발 워크플로까지 함께하는 AI',
		description:
			'GitHub Copilot은 개발자가 코드를 작성하고 이해하는 과정을 돕는 AI 도구입니다. 편집기에서 코드 제안을 받고, 질문을 통해 구현 방법을 탐색할 수 있습니다.',
		features: ['편집기 안에서 코드 제안', '코드 설명과 테스트 작성 지원', '개발 도구와 자연스럽게 연동'],
	},
};

const styles = `
	:root { color-scheme: light; font-family: Inter, Pretendard, "Noto Sans KR", system-ui, sans-serif; color: #18202d; background: #f6f7fb; }
	* { box-sizing: border-box; }
	body { margin: 0; min-height: 100vh; }
	a { color: inherit; }
	.shell { width: min(1040px, calc(100% - 40px)); margin: 0 auto; }
	header { padding: 26px 0; }
	.brand { color: #18202d; font-size: 15px; font-weight: 800; letter-spacing: -.03em; text-decoration: none; }
	main { padding: 58px 0 88px; }
	.eyebrow { margin: 0 0 14px; color: #6875f5; font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
	h1 { max-width: 760px; margin: 0; font-size: clamp(38px, 7vw, 68px); line-height: 1.12; letter-spacing: -.06em; }
	.lede { max-width: 620px; margin: 20px 0 0; color: #687184; font-size: 17px; line-height: 1.8; }
	.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 46px; }
	.card { display: flex; flex-direction: column; min-height: 270px; padding: 24px; border: 1px solid #e8eaf1; border-radius: 18px; background: #fff; text-decoration: none; transition: transform .18s ease, box-shadow .18s ease; }
	.card:hover, .card:focus-visible { transform: translateY(-4px); box-shadow: 0 16px 40px #222b4512; }
	.card:focus-visible, .back:focus-visible { outline: 3px solid #6875f5; outline-offset: 3px; }
	.avatar { display: grid; width: 48px; height: 48px; place-items: center; border-radius: 15px; color: #fff; font-size: 20px; font-weight: 800; }
	.company { margin: 20px 0 6px; color: #8b92a1; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
	.card h2 { margin: 0; font-size: 24px; letter-spacing: -.04em; }
	.card p:last-of-type { margin: 10px 0 22px; color: #687184; line-height: 1.7; }
	.more { margin-top: auto; color: #525ed8; font-size: 14px; font-weight: 750; }
	.detail { max-width: 760px; padding: 36px; border: 1px solid #e8eaf1; border-radius: 22px; background: #fff; }
	.detail h1 { margin-top: 16px; font-size: clamp(40px, 7vw, 60px); }
	.detail .lede { margin-top: 14px; }
	.detail-copy { margin: 30px 0; color: #4f5869; font-size: 16px; line-height: 1.9; }
	.detail h2 { margin: 0 0 14px; font-size: 17px; }
	ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
	li { display: flex; gap: 10px; color: #4f5869; line-height: 1.6; }
	li::before { content: "✓"; color: #10a37f; font-weight: 800; }
	.back { display: inline-block; margin-top: 30px; color: #525ed8; font-size: 14px; font-weight: 750; text-decoration: none; }
	footer { padding: 20px 0 36px; color: #8b92a1; font-size: 13px; }
	@media (max-width: 720px) { main { padding-top: 36px; } .grid { grid-template-columns: 1fr; margin-top: 32px; } .card { min-height: 230px; } .detail { padding: 26px 22px; } }
`;

function renderPage(title, content) {
	return `<!doctype html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#f6f7fb">
	<title>${title} | AI 에이전트 가이드</title>
	<style>${styles}</style>
</head>
<body>
	<header class="shell"><a class="brand" href="/">AI FIELD GUIDE</a></header>
	<main class="shell">${content}</main>
	<footer class="shell">AI 에이전트 가이드 · 각 도구의 기능은 제공사와 이용 환경에 따라 달라질 수 있습니다.</footer>
</body>
</html>`;
}

function renderHome() {
	const cards = Object.entries(agents)
		.map(
			([slug, agent]) => `<a class="card" href="/${slug}">
		<span class="avatar" style="background:${agent.color}" aria-hidden="true">${agent.initial}</span>
		<p class="company">${agent.company}</p>
		<h2>${agent.name}</h2>
		<p>${agent.tagline}</p>
		<span class="more">에이전트 알아보기 →</span>
	</a>`
		)
		.join('\n');

	return renderPage(
		'AI 에이전트 세 가지',
		`<p class="eyebrow">Meet your AI teammates</p>
<h1>나에게 맞는<br>AI 에이전트 찾기</h1>
<p class="lede">각기 다른 강점을 가진 세 가지 AI 에이전트를 살펴보세요. 이름을 누르면 주요 특징과 활용 분야를 확인할 수 있습니다.</p>
<section class="grid" aria-label="AI 에이전트 목록">${cards}</section>`
	);
}

function renderAgent(agent) {
	const features = agent.features.map((feature) => `<li>${feature}</li>`).join('\n');

	return renderPage(
		agent.name,
		`<article class="detail">
		<span class="avatar" style="background:${agent.color}" aria-hidden="true">${agent.initial}</span>
		<p class="company">${agent.company}</p>
		<h1>${agent.name}</h1>
		<p class="lede">${agent.tagline}</p>
		<p class="detail-copy">${agent.description}</p>
		<h2>주요 특징</h2>
		<ul>${features}</ul>
		<a class="back" href="/">← 모든 에이전트 보기</a>
	</article>`
	);
}

const server = http.createServer((req, res) => {
	const pathname = new URL(req.url, 'http://localhost').pathname;

	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.setHeader('X-Content-Type-Options', 'nosniff');

	if (req.method !== 'GET') {
		res.writeHead(405, { Allow: 'GET' });
		res.end(renderPage('지원하지 않는 요청', '<h1>지원하지 않는 요청입니다.</h1><a class="back" href="/">홈으로 돌아가기</a>'));
		return;
	}

	if (pathname === '/') {
		res.writeHead(200);
		res.end(renderHome());
		return;
	}

	const agent = agents[pathname.slice(1)];
	if (agent) {
		res.writeHead(200);
		res.end(renderAgent(agent));
		return;
	}

	res.writeHead(404);
	res.end(renderPage('페이지를 찾을 수 없습니다', '<h1>페이지를 찾을 수 없습니다.</h1><a class="back" href="/">홈으로 돌아가기</a>'));
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});