import { createFileRoute } from '@tanstack/react-router'

const matrixLines = [
  "ACCESS_GRANTED :: deploy_queued :: trace_id=0x7f3a",
  "neural_handshake --latency 12ms --signal stable",
  "SELECT outcome FROM projects WHERE value > noise;",
  "git push origin production && monitor --live",
  "api.gateway.resolve({ auth, billing, realtime })",
  "const product = strategy + code + delivery;",
  "webhook://payments/success -> queue.process()",
  "ssh luan@prod 'pm2 status && tail -f logs'",
  "cache.hit=94% uptime=99.9% build=green",
  "decode business_problem -> technical_scope",
  "POST /v1/leads 201 { source: portfolio }",
  "n8n.workflow.activate('operations_automation')",
  "codex.review(diff) && claude.refactor(module)",
  "gcloud run deploy api --region=southamerica-east1",
  "aws lambda invoke --payload '{ event: lead }'",
  "mobile.release({ reactNative, expo, ota: true })",
];

const whatsappHref =
  "https://wa.me/5548920045037?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.";

const emailHref =
  "mailto:contato@luancunha.dev?subject=Projeto%20via%20portf%C3%B3lio";

const heroWords = ["Luan", "Cunha."];

const services = [
  {
    title: "MVP web",
    body: "Da ideia ao primeiro produto navegável: frontend, backend, banco, autenticação, integrações e deploy em ciclos curtos.",
  },
  {
    title: "AI engineering",
    body: "Fluxos de desenvolvimento com LLMs, Codex, Claude Code, revisão assistida, automações e protótipos que aceleram entrega sem abrir mão de engenharia.",
  },
  {
    title: "Sistema interno",
    body: "Dashboards, portais, CRMs leves e fluxos operacionais para tirar processos importantes de planilhas frágeis.",
  },
  {
    title: "Automação com n8n",
    body: "Workflows, webhooks, integrações com APIs e rotinas para reduzir trabalho manual e conectar ferramentas do negócio.",
  },
  {
    title: "App mobile",
    body: "Aplicações com React Native e Expo para validar experiências mobile, prototipar fluxos e publicar versões incrementais.",
  },
  {
    title: "Landing page de conversão",
    body: "Página rápida, responsiva e objetiva para validar oferta, captar leads e abrir conversas comerciais sem ruído.",
  },
];

const stack = [
  "React",
  "React Native",
  "Expo",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "APIs REST",
  "Google Cloud",
  "AWS",
  "n8n",
  "AI Engineering",
  "LLM workflows",
  "Claude Code",
  "Codex",
];

const commandLoop = [
  "ship --mvp-web",
  "automate --n8n",
  "pair --codex",
  "review --claude-code",
  "deploy --cloud",
  "release --mobile",
];

const process = [
  "Diagnóstico direto do problema e do resultado esperado.",
  "Arquitetura simples o bastante para manter, forte o bastante para escalar.",
  "Entrega em ciclos curtos, com checkpoints claros e código pronto para produção.",
];

const proof = [
  ["experiência consolidada", "construindo produtos web de ponta a ponta"],
  ["AI engineering", "LLMs como ferramenta de entrega, não substituto de critério técnico"],
  ["negócio primeiro", "tecnologia como meio, não como teatro"],
];

const privateWork = [
  "projetos reais sob contrato em produto, operação e integração, com cuidado para preservar contexto sensível.",
  "Experiência em bases de código existentes, evolução de sistemas vivos e entrega sem quebrar fluxo de negócio.",
  "Quando o código não pode ser público, a prova vem pela clareza do escopo, arquitetura e forma de execução.",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/anluuu",
    description: "código público, experimentos e projetos próprios",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luan-cunha-37a7281b0/",
    description: "trajetória, recomendações e contato profissional",
  },
];

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[oklch(8%_0.025_285)] text-[oklch(94%_0.035_300)]">
      <div className="react-bits-veil" aria-hidden="true" />
      <div className="orbital-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="matrix-rain" aria-hidden="true">
        {matrixLines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
      <div className="scanline" aria-hidden="true" />

      <header className="sticky top-0 z-30 border-b border-[oklch(68%_0.18_300_/_0.2)] bg-[oklch(8%_0.025_285_/_0.78)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a
            href="#top"
            className="font-mono text-sm font-semibold text-[oklch(82%_0.2_300)]"
          >
            luan@portfolio:~$
          </a>
          <div className="hidden items-center gap-6 font-mono text-xs text-[oklch(78%_0.06_285)] sm:flex">
            <a href="#stack" className="transition hover:text-white">
              stack
            </a>
            <a href="#servicos" className="transition hover:text-white">
              servicos
            </a>
            <a href="#contato" className="transition hover:text-white">
              contato
            </a>
            <span className="h-4 w-px bg-[oklch(78%_0.06_285_/_0.28)]" />
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                {link.label.toLowerCase()}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_0.92fr]"
      >
        <div className="relative z-10 min-w-0">
          <p className="mb-5 font-mono text-sm text-[oklch(78%_0.18_300)]">
            &gt; sistema online // Matrix mode
          </p>
          <h1 className="split-text max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.035em] text-white sm:text-7xl lg:text-8xl">
            {heroWords.map((word, index) => (
              <span
                key={word}
                className="split-text__word"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {word}
              </span>
            ))}
            <span
              className="decrypt-text shiny-text block text-[oklch(80%_0.22_300)]"
              data-text="Full stack sem enrolação."
            >
              Full stack sem enrolação.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[oklch(84%_0.045_285)] sm:text-xl">
            Desenvolvedor full stack com anos de entrega em produtos digitais,
            automações, AI engineering e sistemas que resolvem problema real de
            negócio.
          </p>
          <div className="text-type mt-5 font-mono text-sm text-[oklch(84%_0.12_300)]">
            <span>builds:</span>
            <span className="text-type__word"> produtos web</span>
            <span className="text-type__word"> automações com LLMs</span>
            <span className="text-type__word"> sistemas internos</span>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[oklch(82%_0.24_300)] bg-[oklch(72%_0.22_300)] px-6 py-4 font-mono text-sm font-bold text-[oklch(8%_0.025_285)] shadow-[0_0_34px_oklch(70%_0.22_300_/_0.32)] transition hover:bg-[oklch(84%_0.22_300)] focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center border border-[oklch(80%_0.12_300_/_0.42)] px-6 py-4 font-mono text-sm font-bold text-[oklch(88%_0.08_300)] transition hover:border-[oklch(82%_0.22_300)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
            >
              Ver o que eu construo
            </a>
            <a
              href={emailHref}
              className="inline-flex items-center justify-center border border-[oklch(76%_0.12_115_/_0.45)] bg-[oklch(12%_0.035_285_/_0.62)] px-6 py-4 font-mono text-sm font-bold text-[oklch(90%_0.08_115)] transition hover:border-[oklch(86%_0.16_115)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
            >
              Enviar e-mail
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-[oklch(76%_0.08_300)]">
            <span>&gt; canais_publicos:</span>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[oklch(70%_0.14_300_/_0.28)] px-3 py-2 text-[oklch(86%_0.1_300)] transition hover:border-[oklch(82%_0.22_300)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="terminal-panel relative z-10 min-w-0 border border-[oklch(70%_0.2_300_/_0.34)] bg-[oklch(13%_0.045_285_/_0.86)] p-5 shadow-[0_0_44px_oklch(58%_0.18_300_/_0.2)]">
          <div className="mb-5 flex items-center justify-between border-b border-[oklch(66%_0.12_300_/_0.22)] pb-3 font-mono text-xs text-[oklch(76%_0.12_300)]">
            <span>runtime: production</span>
            <span className="status-dot">online</span>
          </div>
          <div className="command-loop mb-5" aria-hidden="true">
            <div className="command-loop__track">
              {[...commandLoop, ...commandLoop].map((command, index) => (
                <span key={`${command}-${index}`}>{command}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4 font-mono text-sm leading-7 text-[oklch(82%_0.12_300)]">
            <p>
              <span className="text-[oklch(96%_0.18_300)]">$</span> whoami
            </p>
            <p className="pl-4 text-white">desenvolvedor_full_stack</p>
            <p>
              <span className="text-[oklch(96%_0.18_300)]">$</span>{" "}
              pair --llm=&quot;codex, claude-code&quot; --mode=&quot;senior-review&quot;
            </p>
            <p className="pl-4 text-[oklch(86%_0.08_300)]">
              LLMs aceleram boilerplate, exploração e refactor; arquitetura,
              revisão e responsabilidade continuam humanas.
            </p>
            <p>
              <span className="text-[oklch(96%_0.18_300)]">$</span>{" "}
              open_channel --whatsapp
            </p>
            <p className="pl-4 text-[oklch(92%_0.16_300)]">
              pronto para mapear seu próximo projeto.
            </p>
            <p>
              <span className="text-[oklch(96%_0.18_300)]">$</span>{" "}
              inspect --public-profile
            </p>
            <p className="pl-4">
              <a
                href="https://github.com/anluuu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(90%_0.12_300)] underline decoration-[oklch(72%_0.18_300_/_0.45)] underline-offset-4 transition hover:text-white"
              >
                GitHub
              </a>
              <span className="text-[oklch(70%_0.08_300)]"> / </span>
              <a
                href="https://www.linkedin.com/in/luan-cunha-37a7281b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(90%_0.12_300)] underline decoration-[oklch(72%_0.18_300_/_0.45)] underline-offset-4 transition hover:text-white"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </aside>
      </section>

      <section className="relative z-10 border-y border-[oklch(64%_0.16_300_/_0.2)] bg-[oklch(11%_0.035_285_/_0.88)]">
        <div className="mx-auto grid max-w-6xl gap-px px-5 py-0 sm:grid-cols-3">
          {proof.map(([value, label]) => (
            <div
              key={value}
              className="border-x border-[oklch(64%_0.16_300_/_0.16)] px-5 py-8"
            >
              <p className="font-mono text-2xl font-black text-[oklch(84%_0.2_300)]">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[oklch(80%_0.045_285)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
              ./experiencia
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black tracking-[-0.025em] text-white sm:text-5xl">
              Projetos reais sob contrato.
            </h2>
          </div>
          <div className="grid gap-4">
            {privateWork.map((item) => (
              <p
                key={item}
                className="border border-[oklch(68%_0.13_300_/_0.24)] bg-[oklch(14%_0.035_285_/_0.72)] p-5 text-pretty leading-7 text-[oklch(84%_0.045_285)]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="relative z-10 mx-auto max-w-6xl px-5 py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
              ./servicos
            </p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black tracking-[-0.025em] text-white sm:text-5xl">
              Do MVP ao sistema interno.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-[oklch(68%_0.13_300_/_0.24)] bg-[oklch(14%_0.035_285_/_0.72)] p-6"
              >
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-pretty leading-7 text-[oklch(82%_0.045_285)]">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="relative z-10 bg-[oklch(12%_0.045_285_/_0.86)] px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
                ./stack
              </p>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.025em] text-white sm:text-5xl">
                Arquitetura de ponta a ponta.
              </h2>
            </div>
            <p className="max-w-md text-pretty leading-7 text-[oklch(82%_0.045_285)]">
              Eu consigo sair da tela bonita e chegar no banco, na API, na fila
              de deploy, no fluxo com LLMs e na manutenção depois que o sistema
              está vivo.
            </p>
          </div>
          <div
            className="stack-carousel mt-10 overflow-hidden border-y border-[oklch(72%_0.16_300_/_0.22)] py-5"
            aria-label="Tecnologias que uso"
          >
            <div className="stack-track">
              {[...stack, ...stack].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="stack-chip border border-[oklch(72%_0.16_300_/_0.32)] bg-[oklch(9%_0.025_285_/_0.78)] px-4 py-3 font-mono text-sm text-[oklch(88%_0.11_300)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
              ./processo
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.025em] text-white sm:text-5xl">
              Menos cerimônia. Mais entrega rastreável.
            </h2>
          </div>
          <ol className="space-y-4">
            {process.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[3rem_1fr] items-start gap-4 border border-[oklch(68%_0.13_300_/_0.24)] bg-[oklch(14%_0.035_285_/_0.72)] p-5"
              >
                <span className="font-mono text-lg font-black text-[oklch(82%_0.2_300)]">
                  0{index + 1}
                </span>
                <p className="text-pretty leading-7 text-[oklch(84%_0.045_285)]">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative z-10 border-y border-[oklch(64%_0.16_300_/_0.2)] bg-[oklch(12%_0.045_285_/_0.82)] px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
              ./disponibilidade
            </p>
            <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl">
              Aberto para freelas selecionados, consultoria técnica e projetos
              sob demanda.
            </h2>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center border border-[oklch(82%_0.24_300)] bg-[oklch(72%_0.22_300)] px-6 py-4 font-mono text-sm font-bold text-[oklch(8%_0.025_285)] shadow-[0_0_34px_oklch(70%_0.22_300_/_0.32)] transition hover:bg-[oklch(84%_0.22_300)] focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
          >
            Consultar agenda
          </a>
        </div>
      </section>

      <footer
        id="contato"
        className="relative z-10 border-t border-[oklch(64%_0.16_300_/_0.2)] bg-[oklch(7%_0.025_285)] px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm text-[oklch(78%_0.18_300)]">
            ./contato
          </p>
          <h2 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-[-0.025em] text-white sm:text-6xl">
            Tem uma ideia presa na simulação?
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[oklch(84%_0.045_285)]">
            Me chama com o contexto do projeto. Eu te ajudo a transformar o
            problema em escopo, arquitetura e uma primeira entrega concreta.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-[oklch(82%_0.24_300)] bg-[oklch(72%_0.22_300)] px-6 py-4 font-mono text-sm font-bold text-[oklch(8%_0.025_285)] shadow-[0_0_34px_oklch(70%_0.22_300_/_0.32)] transition hover:bg-[oklch(84%_0.22_300)] focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
            >
              Falar no WhatsApp
            </a>
            <a
              href={emailHref}
              className="inline-flex items-center justify-center border border-[oklch(76%_0.12_115_/_0.45)] bg-[oklch(12%_0.035_285_/_0.62)] px-6 py-4 font-mono text-sm font-bold text-[oklch(90%_0.08_115)] transition hover:border-[oklch(86%_0.16_115)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
            >
              Enviar e-mail
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[oklch(76%_0.08_300)]">
            <span>perfis:</span>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[oklch(88%_0.1_300)] underline decoration-[oklch(72%_0.18_300_/_0.45)] underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(88%_0.2_300)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <p
                key={link.description}
                className="border border-[oklch(68%_0.13_300_/_0.2)] bg-[oklch(12%_0.035_285_/_0.56)] p-4 font-mono text-xs leading-6 text-[oklch(82%_0.06_300)]"
              >
                <span className="text-[oklch(88%_0.14_300)]">
                  {link.label}:
                </span>{" "}
                {link.description}.
              </p>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
