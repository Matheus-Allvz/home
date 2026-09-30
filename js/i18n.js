/* ==========================================================================
   MATHEUS ALVES // INTERNATIONALIZATION ENGINE (i18n)
   Bilingual Support: Portuguese (pt-BR) & English (en-US)
   Browser auto-detection, localStorage persistence, live DOM translation
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'portfolio_lang';

    const TRANSLATIONS = {
        pt: {
            meta: {
                title: "Matheus Alves — Engenheiro de Backend & Arquiteto C# .NET 8",
                description: "Portfolio de Matheus Alves da Costa: Desenvolvedor Backend C# (.NET 8), Microsserviços, Clean Architecture e Sistemas Distribuídos de Alta Performance.",
                ogTitle: "Matheus Alves — Arquiteto Backend & Engenheiro C#",
                ogDescription: "Sistemas resilientes em C# (.NET 8), RabbitMQ, PostgreSQL e Clean Architecture."
            },
            preloader: {
                word0: "BEM-VINDO",
                word1: "AO",
                word2: "PORTFOLIO",
                word3: "DE",
                word4: "MATHEUS",
                word5: "ALVES",
                sentence: "BEM-VINDO AO PORTFOLIO DE MATHEUS ALVES",
                note: "Arquitetura Backend C# .NET 8 // Sistemas Distribuídos Resilientes e de Alto Throughput"
            },
            hud: {
                status: "ACTUAR // DEV C#",
                audioLabel: "SOM:",
                audioTitle: "Alternar Efeitos Sonoros do Sintetizador",
                navIntro: '<span class="num">00.</span>INTRO',
                navWorks: '<span class="num">01.</span>PROJETOS',
                navMetrics: '<span class="num">02.</span>MÉTRICAS',
                navProcess: '<span class="num">03.</span>PROCESSO',
                navManifesto: '<span class="num">04.</span>MANIFESTO',
                navLab: '<span class="num">05.</span>LAB',
                navContact: '<span class="num">06.</span>CONTATO',
                mobileMenuAria: "Abrir Menu"
            },
            drawer: {
                closeBtn: "[ ✕ ] FECHAR",
                closeAria: "Fechar Menu",
                navIntro: '<span class="d-num">00.</span>INTRO',
                navWorks: '<span class="d-num">01.</span>PROJETOS',
                navMetrics: '<span class="d-num">02.</span>MÉTRICAS',
                navProcess: '<span class="d-num">03.</span>PROCESSO',
                navManifesto: '<span class="d-num">04.</span>MANIFESTO',
                navLab: '<span class="d-num">05.</span>LAB',
                navContact: '<span class="d-num">06.</span>HUB DE CONTATO ↗',
                statusPill: "ACTUAR // DEV C# .NET 8"
            },
            hero: {
                topManifesto: "DISCIPLINA ARQUITETURAL // BACKEND C# .NET 8 // ZERO FALHAS SILENCIOSAS // LIMITES CLAROS DE DOMÍNIO // PERSISTÊNCIA RELACIONAL DE ALTO THROUGHPUT",
                vertical1: "NÃO ESCREVERÁS BLOCOS CATCH SILENCIOSOS. HONRARÁS AS FRONTEIRAS DA CLEAN ARCHITECTURE. TRATARÁS ANÁLISE DE CAUSA-RAIZ COMO UMA CIÊNCIA EXATA. REDUZIRÁS LATÊNCIA HUMANA A PIPELINES DE SUB-SEGUNDO. PROJETARÁS FILAS RESILIENTES COM IDEMPOTÊNCIA.",
                vertical2: "NÃO SOBRECARREGARÁS TUA LÓGICA DE DOMÍNIO. MEDIRÁS ALOCAÇÕES ANTES DA OTIMIZAÇÃO. NUNCA FARÁS DEPLOY DE CHAVES ESTRANGEIRAS SEM ÍNDICES.",
                badgeSub: "[ARQUITETO BACKEND &amp; ENGENHEIRO C# .NET 8]",
                roleLabel: "// CARGO",
                roleValue: "Dev Backend C# @ Actuar",
                roleNote: "Promovido N1 ➔ N2 ➔ Dev C#",
                academicLabel: "// FORMAÇÃO",
                academicValue: "PUC Goiás (CR: 8.6)",
                academicNote: "Ciência da Computação (2024-2029)",
                specLabel: "// ESPECIALIZAÇÃO",
                specValue: "C# .NET 8 / Clean Arch / RabbitMQ",
                specNote: "Sistemas distribuídos de alto throughput",
                stampText: "● MATHEUS ALVES ● ARQUITETO C# .NET 8 ● ACTUAR ● CR 8.6 PUC-GO",
                stampAria: "Selo Matheus Alves da Costa",
                ticker: "// C# .NET 8 // CLEAN ARCHITECTURE // CQRS // RABBITMQ // POSTGRESQL // PIPELINES DE ALTO THROUGHPUT // ZERO FALHAS SILENCIOSAS // TELEMETRIA SUB-SEGUNDO //"
            },
            works: {
                counter: "[01.0 // PROJETOS SELECIONADOS 2024 — 2026]",
                heading: "REPERTÓRIO DE ENGENHARIA",
                broadcast: "PASSE O MOUSE NO PROJETO PARA SINTONIZAR A TV CRT",
                scrollHint: "ROLE PARA BAIXO PARA MERGULHAR NO PORTAL DE TELEMETRIA",
                ch1: {
                    badgeLateral: "C# .NET 8 // GANHO DE 99.4%",
                    metricLateral: "6m02s ➔ 1.84s (GANHO DE 99.4%)",
                    badgeTv: "CH-01 // DATACLEAN.ENGINE",
                    recTv: "BENCHMARK AO VIVO",
                    term1: "&gt; MOTOR: C# .NET 8 / CLEAN ARCHITECTURE",
                    term2: "&gt; LOTE: INGESTÃO DE 48.200 REGISTROS",
                    term3: "&gt; LATÊNCIA: 6m02s ➔ 1.84s (GANHO DE 99.4%)",
                    term4: "&gt; MEMÓRIA: 0 GC STALLS // STREAMING PARSER",
                    footer1: "STATUS: 200 OK",
                    footer2: "RABBITMQ + POSTGRESQL"
                },
                ch2: {
                    badgeLateral: "AUTOMAÇÃO C# / JS",
                    metricLateral: "100% In-House // Zero Latência",
                    badgeTv: "CH-02 // MEPPO.FOCUS",
                    recTv: "AUTOMAÇÃO",
                    term1: "&gt; ORQUESTRAÇÃO: APIS CLICKUP &amp; WHATSAPP",
                    term2: "&gt; TEMPO ECONOMIZADO: 6min MANUAL ➔ 4 SEGUNDOS",
                    term3: "&gt; PROTOCOLO: BARRAMENTO RESTful",
                    term4: "&gt; REDUÇÃO DE 85% NA CARGA COGNITIVA",
                    footer1: "STATUS: EXECUÇÃO ATIVA",
                    footer2: "100% PRODUÇÃO PRÓPRIA"
                },
                ch3: {
                    badgeLateral: "RABBITMQ / POSTGRES",
                    metricLateral: "Nota: 14.75 / 15.0 // 5x Top 1",
                    badgeTv: "CH-03 // ACTUAR.RCA",
                    recTv: "DIAGNÓSTICOS",
                    term1: "&gt; MOTOR RCA: ISOLANDO VETORES DE FALHA",
                    term2: "&gt; NOTA DE CERTIFICAÇÃO: 14.75 / 15.0",
                    term3: "&gt; MÉTRICAS: 5x ANALISTA TOP 1 DO MÊS",
                    term4: "&gt; RESILIÊNCIA N2 - ALTA COMPLEXIDADE",
                    footer1: "PROMOVIDO N1 ➔ N2 ➔ DEV",
                    footer2: "PRODUÇÃO ACTUAR"
                },
                ch4: {
                    badgeLateral: "FILAS DE ALTO THROUGHPUT",
                    metricLateral: "12.400 msgs/s // Span&lt;T&gt; 0 B Heap",
                    badgeTv: "CH-04 // ASYNC.PIPELINE",
                    recTv: "ALTO THROUGHPUT",
                    term1: "&gt; STREAM: IAsyncEnumerable&lt;RecordChunk&gt;",
                    term2: "&gt; TAXA: 12.400 MSGS / SEGUNDO",
                    term3: "&gt; MEMÓRIA: 0 B NO HEAP (Span&lt;T&gt;)",
                    term4: "&gt; SAÚDE: IDEMPOTENTE &amp; ZERO PERDAS",
                    footer1: "POSTGRESQL + EF CORE",
                    footer2: "GRAVAÇÕES EM LOTE COM DAPPER"
                },
                ch5: {
                    title: "TELEMETRIA EMBARCADA",
                    badgeLateral: "RP2040 / FREERTOS C++",
                    metricLateral: "Amostragem 1000 Hz // FIFO de Alta Velocidade",
                    badgeTv: "CH-05 // TELEMETRY.IOT",
                    recTv: "LAB DE HARDWARE",
                    term1: "&gt; MCU: DUAL ARM CORTEX-M0+ @ 133MHz",
                    term2: "&gt; AMOSTRAGEM: 1000 Hz EM TEMPO REAL SEM JITTER",
                    term3: "&gt; PROTOCOLO: FIFO DE ALTA VELOCIDADE UART / SPI",
                    term4: "&gt; ACADÊMICO: PUC GOIÁS CS (CR 8.6)",
                    footer1: "FREERTOS C++",
                    footer2: "ANALISADO EM ANALISADOR LÓGICO"
                },
                chNext: {
                    badgeTv: "CH-NEXT // HUB DE TELEMETRIA",
                    recTv: "PORTAL ATIVADO",
                    term1: "&gt; INICIANDO TRANSIÇÃO PARA SEÇÃO 02...",
                    term2: "&gt; RECONHECIMENTOS &amp; BENCHMARKS DE SISTEMA",
                    term3: "&gt; BENCHMARK: 5x TOP 1 / 14.75 / CR 8.6",
                    term4: "&gt; CÂMERA MERGULHANDO NOS FÓSFOROS...",
                    footer1: "STATUS: 200 OK",
                    footer2: "SEÇÃO 02 SE APROXIMANDO ➔"
                }
            },
            metrics: {
                tag: "// 02.0 RECONHECIMENTOS &amp; BENCHMARKS",
                heading: "PREMIAÇÕES &amp; TELEMETRIA",
                card1Badge: "RANKINGS ACTUAR",
                card1Desc: "Eleito 5 vezes Analista Top 1 e 1 vez Top 2 no ranking geral interno de performance técnica e resolução em apenas 8 meses.",
                card1Footer: "RESOLUÇÃO DE INCIDENTES DE ALTA COMPLEXIDADE",
                card2Badge: "NOTA DE CERTIFICAÇÃO",
                card2Desc: "Pontuação quase perfeita na rigorosa certificação técnica interna de arquitetura do ecossistema, regras de negócio e fluxo de dados.",
                card2Footer: "PROMOVIDO N1 ➔ N2 ➔ DEV C#",
                card3Badge: "HONRAS ACADÊMICAS",
                card3Desc: "Coeficiente de Rendimento destacado no Bacharelado em Ciência da Computação pela PUC Goiás. Domínio de Estruturas de Dados, Algoritmos e SOs.",
                card3Footer: "PUC GOIÁS // 2024 — 2029",
                card4Badge: "QUEDA DE LATÊNCIA",
                card4Desc: "Otimização drástica do pipeline de dados de 6 minutos de processamento síncrono para menos de 2 segundos via paralelismo assíncrono em C#.",
                card4Footer: "THROUGHPUT SUB-SEGUNDO"
            },
            process: {
                pill: "GALERIA // SESSÕES DE ARQUITETURA",
                title: "MEU PROCESSO",
                sub: "Um ciclo de engenharia comprovado em 6 fases para sistemas backend com zero defeitos, da descoberta inicial de RCA à telemetria em produção.",
                cd1Title: "Briefing &amp; RCA",
                cd1Desc: "Investigação profunda de gargalos operacionais e levantamento minucioso dos requisitos de negócio e latência alvo.",
                cd2Title: "Modelagem de Domínio",
                cd2Desc: "Mapeamento de agregados, entidades ricas e isolamento dos limites de contexto para prevenir acoplamentos indesejados.",
                cd3Title: "KickOff &amp; Filas",
                cd3Desc: "Estruturação de tópicos, filas resilientes e mensageria assíncrona desacoplada para suportar picos de tráfego.",
                cd4Title: "Desenvolvimento",
                cd4Desc: "Construção em C# (.NET 8) com Clean Architecture, CQRS, queries otimizadas em Dapper/EF Core e injeção de dependência.",
                cd5Title: "Benchmark &amp; Otimização",
                cd5Desc: "Testes de carga com BenchmarkDotNet, análise de coletas de Garbage Collection e eliminação de gargalos de I/O.",
                cd6Title: "Qualidade &amp; Deploy",
                cd6Desc: "Deploy conteinerizado via Docker em Linux VPS, instrumentação de logs estruturados e monitoramento contínuo em tempo real."
            },
            manifesto: {
                tag: "// 04.0 CÓDIGO DE ÉTICA &amp; DISCIPLINA",
                title: "OS 10 MANDAMENTOS DO ARTESANATO BACKEND",
                c1Title: "Não escreverás blocos catch silenciosos",
                c1Desc: "Engolir exceções oculta corrupção de estado. Toda falha deve ser registrada com rastreamento de pilha completo ou tratada com idempotência.",
                c2Title: "Honrarás a Clean Architecture",
                c2Desc: "A camada de Domínio deve permanecer pura e desacoplada de frameworks, bancos de dados e protocolos externos.",
                c3Title: "Tratarás a RCA como uma ciência exata",
                c3Desc: "Não aplique correções superficiais em sintomas; investigue a causa-raiz nos logs estruturados até isolar o vetor da falha.",
                c4Title: "Esmagarás a latência humana",
                c4Desc: "Se uma rotina manual custa 6 minutos à equipe de atendimento, automatize o fluxo para milissegundos com C# assíncrono.",
                c5Title: "Projetarás filas resilientes",
                c5Desc: "Mensageria distribuída com RabbitMQ deve prever dead-letter queues, retentativas exponenciais e consumidores idempotentes.",
                c6Title: "Medirás alocações de memória",
                c6Desc: "Alocações excessivas no heap desencadeiam pausas de Garbage Collector. Utilize Span&lt;T&gt;, ReadOnlyMemory&lt;T&gt; e streams sempre que aplicável.",
                c7Title: "Criarás índices em chaves estrangeiras",
                c7Desc: "Queries sem índices causam table scans em tabelas massivas. Otimize o plano de execução antes de culpar o banco de dados.",
                c8Title: "Desacoplarás leitura de escrita",
                c8Desc: "Empregue CQRS com Dapper para leituras de ultra-alta velocidade e EF Core com regras de agregação para mutações críticas.",
                c9Title: "Emitirás observabilidade estruturada",
                c9Desc: "Logs em texto puro dificultam diagnósticos distribuídos. Emita JSON com CorrelationId e métricas de telemetria integradas.",
                c10Title: "Construirás software que supera o hype",
                c10Desc: "Priorize robustez, testabilidade e clareza de engenharia sobre tendências passageiras do ecossistema."
            },
            lab: {
                tag: "// 05.0 ARSENAL TÉCNICO",
                title: "ESPECIFICAÇÕES DE ENGENHARIA",
                s1Desc: "Desenvolvimento de APIs robustas, Workers assíncronos em background, Tasks concorrentes, Channels e LINQ de alta performance.",
                s2Desc: "Domain-Driven Design, MediatR, desacoplamento por camadas, interfaces coesas e segregação estrita de comandos e consultas.",
                s3Desc: "Arquitetura orientada a eventos, tópicos, fanouts, controle de concorrência e processamento assíncrono distribuído.",
                s4Desc: "Modelagem relacional, otimização de índices B-Tree, CTEs complexas, isolamento de transações ACID e Dapper ORM.",
                s5Desc: "Conteinerização multi-stage leve com Alpine, reverse proxy com Nginx, certificados SSL automatizados e deploy contínuo.",
                s6Desc: "Sistemas embarcados em microcontroladores RP2040 e ESP32 com FreeRTOS, telemetria serial via UART/SPI e controle em tempo real."
            },
            outro: {
                heading: "PRECISAMOS CONSTRUIR<br>SISTEMAS RESILIENTES.",
                sub: "Disponível para desafios de alta complexidade técnica, engenharia de backend C# (.NET 8) e sistemas distribuídos.",
                whatsapp: "WHATSAPP DIRETO",
                linkedin: "PERFIL LINKEDIN",
                github: "REPOSITÓRIOS GITHUB",
                email: "EMAIL",
                copyBadge: "[COPIAR]",
                copiedBadge: "[COPIADO!]"
            },
            footer: {
                rights: "Todos os direitos reservados. Engenharia de Backend.",
                inquiries: "Contato Direto:",
                follow: "Acompanhe a Arquitetura:",
                academic: "Formação Acadêmica:",
                backToTop: "VOLTAR AO TOPO ↑"
            },
            toast: {
                emailCopied: "Email copiado para a área de transferência!"
            },
            cursor: {
                explore: "EXPLORAR",
                switchCh: "MUDAR CANAL",
                play: "TOCAR",
                copy: "COPIAR",
                view: "VER",
                dive: "MERGULHAR"
            }
        },
        en: {
            meta: {
                title: "Matheus Alves — Backend Engineer & C# .NET 8 Architect",
                description: "Portfolio of Matheus Alves da Costa: C# (.NET 8) Backend Developer, Microservices, Clean Architecture, and High-Performance Distributed Systems.",
                ogTitle: "Matheus Alves — Backend Architect & C# Engineer",
                ogDescription: "Resilient systems in C# (.NET 8), RabbitMQ, PostgreSQL, and Clean Architecture."
            },
            preloader: {
                word0: "WELCOME",
                word1: "TO",
                word2: "THE PORTFOLIO",
                word3: "OF",
                word4: "MATHEUS",
                word5: "ALVES",
                sentence: "WELCOME TO THE PORTFOLIO OF MATHEUS ALVES",
                note: "C# .NET 8 Backend Architecture // High-Throughput & Resilient Distributed Systems"
            },
            hud: {
                status: "ACTUAR // C# DEV",
                audioLabel: "SOUND:",
                audioTitle: "Toggle Synthesizer Sound FX",
                navIntro: '<span class="num">00.</span>INTRO',
                navWorks: '<span class="num">01.</span>WORKS',
                navMetrics: '<span class="num">02.</span>METRICS',
                navProcess: '<span class="num">03.</span>PROCESS',
                navManifesto: '<span class="num">04.</span>MANIFESTO',
                navLab: '<span class="num">05.</span>LAB',
                navContact: '<span class="num">06.</span>CONTACT',
                mobileMenuAria: "Open Menu"
            },
            drawer: {
                closeBtn: "[ ✕ ] CLOSE",
                closeAria: "Close Menu",
                navIntro: '<span class="d-num">00.</span>INTRO',
                navWorks: '<span class="d-num">01.</span>WORKS',
                navMetrics: '<span class="d-num">02.</span>METRICS',
                navProcess: '<span class="d-num">03.</span>PROCESS',
                navManifesto: '<span class="d-num">04.</span>MANIFESTO',
                navLab: '<span class="d-num">05.</span>LAB',
                navContact: '<span class="d-num">06.</span>CONTACT HUB ↗',
                statusPill: "ACTUAR // C# .NET 8 DEV"
            },
            hero: {
                topManifesto: "ARCHITECTURAL DISCIPLINE // C# .NET 8 BACKEND // ZERO SILENT FAILURES // CLEAN DOMAIN BOUNDARIES // HIGH-THROUGHPUT RELATIONAL PERSISTENCE",
                vertical1: "THOU SHALT NOT WRITE SILENT CATCH BLOCKS. THOU SHALT HONOR CLEAN ARCHITECTURE BOUNDARIES. THOU SHALT TREAT ROOT CAUSE ANALYSIS AS AN EXACT SCIENCE. THOU SHALT REDUCE HUMAN LATENCY INTO SUB-SECOND PIPELINES. THOU SHALT DESIGN RESILIENT QUEUES WITH IDEMPOTENCY.",
                vertical2: "THOU SHALT NOT OVERLOAD YOUR DOMAIN LOGIC. THOU SHALT MEASURE ALLOCATIONS BEFORE OPTIMIZATION. THOU SHALT NEVER DEPLOY UNINDEXED FOREIGN KEYS.",
                badgeSub: "[BACKEND ARCHITECT &amp; C# .NET 8 ENGINEER]",
                roleLabel: "// ROLE",
                roleValue: "Backend Software Dev @ Actuar",
                roleNote: "Promoted N1 ➔ N2 ➔ Dev C#",
                academicLabel: "// ACADEMIC",
                academicValue: "PUC Goiás (CR: 8.6)",
                academicNote: "Computer Science (2024-2029)",
                specLabel: "// SPECIALIZATION",
                specValue: "C# .NET 8 / Clean Arch / RabbitMQ",
                specNote: "High-throughput distributed systems",
                stampText: "● MATHEUS ALVES ● C# .NET 8 ARCHITECT ● ACTUAR ● CR 8.6 PUC-GO",
                stampAria: "Matheus Alves da Costa Stamp",
                ticker: "// C# .NET 8 // CLEAN ARCHITECTURE // CQRS // RABBITMQ // POSTGRESQL // HIGH-THROUGHPUT PIPELINES // ZERO SILENT FAILURES // SUB-SECOND TELEMETRY //"
            },
            works: {
                counter: "[01.0 // SELECTED WORKS 2024 — 2026]",
                heading: "ENGINEERING REPERTORY",
                broadcast: "HOVER PROJECT TO TUNE VINTAGE CRT TV",
                scrollHint: "SCROLL DOWN TO DIVE INTO TELEMETRY PORTAL",
                ch1: {
                    badgeLateral: "C# .NET 8 // 99.4% GAIN",
                    metricLateral: "6m02s ➔ 1.84s (99.4% SPEEDUP)",
                    badgeTv: "CH-01 // DATACLEAN.ENGINE",
                    recTv: "LIVE BENCHMARK",
                    term1: "&gt; ENGINE: C# .NET 8 / CLEAN ARCHITECTURE",
                    term2: "&gt; BATCH: 48,200 RECORDS INGESTION",
                    term3: "&gt; LATENCY: 6m02s ➔ 1.84s (99.4% GAIN)",
                    term4: "&gt; MEMORY: 0 GC STALLS // STREAMING PARSER",
                    footer1: "STATUS: 200 OK",
                    footer2: "RABBITMQ + POSTGRESQL"
                },
                ch2: {
                    badgeLateral: "C# / JS AUTOMATION",
                    metricLateral: "100% In-House // Zero Latency",
                    badgeTv: "CH-02 // MEPPO.FOCUS",
                    recTv: "AUTOMATION",
                    term1: "&gt; ORCHESTRATION: CLICKUP &amp; WHATSAPP APIS",
                    term2: "&gt; TIME SAVED: 6min MANUAL ➔ 4 SECONDS",
                    term3: "&gt; PROTOCOL: RESTful EVENT BUS",
                    term4: "&gt; REDUCED COGNITIVE LOAD BY 85%",
                    footer1: "STATUS: ACTIVE RUN",
                    footer2: "100% IN-HOUSE PROD"
                },
                ch3: {
                    badgeLateral: "RABBITMQ / POSTGRES",
                    metricLateral: "Score: 14.75 / 15.0 // 5x Top 1",
                    badgeTv: "CH-03 // ACTUAR.RCA",
                    recTv: "DIAGNOSTICS",
                    term1: "&gt; RCA ENGINE: ISOLATING INCIDENT VECTORS",
                    term2: "&gt; CERTIFICATION SCORE: 14.75 / 15.0",
                    term3: "&gt; METRICS: 5x TOP 1 ANALYST OF THE MONTH",
                    term4: "&gt; TIER-2 HIGH COMPLEXITY RESILIENCE",
                    footer1: "PROMOTED N1 ➔ N2 ➔ DEV",
                    footer2: "ACTUAR PRODUCTION"
                },
                ch4: {
                    badgeLateral: "HIGH-THROUGHPUT QUEUES",
                    metricLateral: "12,400 msgs/s // Span&lt;T&gt; 0 B Heap",
                    badgeTv: "CH-04 // ASYNC.PIPELINE",
                    recTv: "HIGH-THROUGHPUT",
                    term1: "&gt; STREAM: IAsyncEnumerable&lt;RecordChunk&gt;",
                    term2: "&gt; RATE: 12,400 MSGS / SECOND",
                    term3: "&gt; MEMORY: 0 B ON HEAP (Span&lt;T&gt;)",
                    term4: "&gt; HEALTH: IDEMPOTENT &amp; ZERO LOSS",
                    footer1: "POSTGRESQL + EF CORE",
                    footer2: "DAPPER BULK WRITES"
                },
                ch5: {
                    title: "EMBEDDED TELEMETRY",
                    badgeLateral: "RP2040 / FREERTOS C++",
                    metricLateral: "1000 Hz Sampling // High-Speed FIFO",
                    badgeTv: "CH-05 // TELEMETRY.IOT",
                    recTv: "HARDWARE LAB",
                    term1: "&gt; MCU: DUAL ARM CORTEX-M0+ @ 133MHz",
                    term2: "&gt; SAMPLING: 1000 Hz JITTER-FREE",
                    term3: "&gt; PROTOCOL: UART / SPI HIGH-SPEED FIFO",
                    term4: "&gt; ACADEMIC: PUC GOIÁS CS (CR 8.6)",
                    footer1: "FREERTOS C++",
                    footer2: "LOGIC ANALYZED"
                },
                chNext: {
                    badgeTv: "CH-NEXT // TELEMETRY HUB",
                    recTv: "PORTAL ENGAGED",
                    term1: "&gt; INITIATING SECTION 02 HANDOFF...",
                    term2: "&gt; RECOGNITIONS &amp; SYSTEM BENCHMARKS",
                    term3: "&gt; BENCHMARK: 5x TOP 1 / 14.75 / CR 8.6",
                    term4: "&gt; CAMERA PLUNGING INTO PHOSPHORS...",
                    footer1: "STATUS: 200 OK",
                    footer2: "SECTION 02 INCOMING ➔"
                }
            },
            metrics: {
                tag: "// 02.0 RECOGNITIONS &amp; BENCHMARKS",
                heading: "AWARDS &amp; TELEMETRY",
                card1Badge: "ACTUAR RANKINGS",
                card1Desc: "Voted Top 1 Technical Analyst 5 times and Top 2 once in internal company-wide technical performance and incident resolution across just 8 months.",
                card1Footer: "HIGH COMPLEXITY INCIDENT RESOLUTION",
                card2Badge: "CERTIFICATION SCORE",
                card2Desc: "Near-perfect score on the rigorous internal technical certification covering ecosystem architecture, business domain rules, and data flow pipelines.",
                card2Footer: "PROMOTED N1 ➔ N2 ➔ DEV C#",
                card3Badge: "ACADEMIC HONORS",
                card3Desc: "Distinguished GPA in Computer Science Bachelor's degree at PUC Goiás. Deep command of Data Structures, Algorithms, Compilers, and Operating Systems.",
                card3Footer: "PUC GOIÁS // 2024 — 2029",
                card4Badge: "LATENCY DROP",
                card4Desc: "Dramatic data pipeline optimization from 6 minutes of synchronous processing down to under 2 seconds through asynchronous parallelism in C# .NET 8.",
                card4Footer: "SUB-SECOND THROUGHPUT"
            },
            process: {
                pill: "GALLERY // ARCHITECTURAL SESSIONS",
                title: "MY PROCESS",
                sub: "A 6-phase battle-tested engineering cycle for zero-defect backend systems, from initial RCA discovery to production telemetry.",
                cd1Title: "Briefing &amp; RCA",
                cd1Desc: "Deep investigation of operational bottlenecks and rigorous gathering of business requirements, domain invariants, and target latency SLAs.",
                cd2Title: "Domain Modeling",
                cd2Desc: "Mapping aggregates, rich domain entities, and isolating bounded context frontiers to prevent coupling and preserve business rules.",
                cd3Title: "KickOff &amp; Queues",
                cd3Desc: "Structuring topics, resilient message queues, and decoupled asynchronous messaging architectures built to sustain heavy traffic spikes.",
                cd4Title: "Development",
                cd4Desc: "Building in C# (.NET 8) with Clean Architecture, CQRS, optimized high-speed queries in Dapper/EF Core, and dependency injection.",
                cd5Title: "Benchmark &amp; Tuning",
                cd5Desc: "Rigorous stress testing with BenchmarkDotNet, garbage collection allocation profiling, and eradication of hidden I/O bottlenecks.",
                cd6Title: "Quality &amp; Deploy",
                cd6Desc: "Containerized deployment via Docker on Linux VPS, structured logging instrumentation, health checks, and continuous real-time monitoring."
            },
            manifesto: {
                tag: "// 04.0 CODE OF ETHICS &amp; DISCIPLINE",
                title: "THE 10 COMMANDMENTS OF BACKEND CRAFTSMANSHIP",
                c1Title: "Thou shalt not write silent catch blocks",
                c1Desc: "Swallowing exceptions conceals state corruption. Every failure must be recorded with full stack tracing or resolved with idempotent fallbacks.",
                c2Title: "Thou shalt honor Clean Architecture",
                c2Desc: "The Domain layer must remain pristine and decoupled from frameworks, databases, external protocols, and infrastructure concerns.",
                c3Title: "Thou shalt treat RCA as an exact science",
                c3Desc: "Never patch superficial symptoms; investigate the root cause across structured logs until isolating the exact incident vector.",
                c4Title: "Thou shalt crush human latency",
                c4Desc: "If a manual routine costs the support team 6 minutes, automate the entire workflow into sub-second pipelines with asynchronous C# .NET 8.",
                c5Title: "Thou shalt design resilient queues",
                c5Desc: "Distributed messaging with RabbitMQ must guarantee dead-letter exchanges, exponential backoff retries, and strictly idempotent consumers.",
                c6Title: "Thou shalt benchmark memory allocations",
                c6Desc: "Excessive heap allocations trigger intrusive Garbage Collection pauses. Leverage Span&lt;T&gt;, ReadOnlyMemory&lt;T&gt;, and zero-copy streaming.",
                c7Title: "Thou shalt index foreign keys",
                c7Desc: "Unindexed queries cause brutal sequential table scans on massive relational databases. Optimize execution plans before blaming the database engine.",
                c8Title: "Thou shalt decouple read from write",
                c8Desc: "Apply CQRS with Dapper for ultra-fast throughput reads and EF Core with domain validation aggregates for critical state mutations.",
                c9Title: "Thou shalt emit structured observability",
                c9Desc: "Plain text logs cripple distributed diagnostics. Emit structured JSON events with unified CorrelationIds and integrated telemetry metrics.",
                c10Title: "Thou shalt build software that outlasts hype",
                c10Desc: "Prioritize architectural robustness, strict testability, and engineering clarity over passing ecosystem trends and superficial fads."
            },
            lab: {
                tag: "// 05.0 TECH ARSENAL",
                title: "ENGINEERING SPECIFICATIONS",
                s1Desc: "Architecting robust APIs, background asynchronous workers, concurrent task pipelines, System.Threading.Channels, and high-performance LINQ.",
                s2Desc: "Domain-Driven Design, MediatR, multi-tier layer decoupling, cohesive interfaces, and strict segregation of commands and queries.",
                s3Desc: "Event-driven architecture, direct/topic/fanout exchanges, concurrency controls, and high-resilience distributed async workers.",
                s4Desc: "Relational database modeling, B-Tree index tuning, complex CTEs, rigorous ACID transaction isolation, and raw Dapper performance.",
                s5Desc: "Lightweight multi-stage containerization with Alpine, Nginx reverse proxies, automated SSL certificates, and automated CI/CD deployments.",
                s6Desc: "Embedded systems engineering on RP2040 and ESP32 MCUs with FreeRTOS, high-speed UART/SPI telemetry, and deterministic real-time control."
            },
            outro: {
                heading: "WE NEED TO BUILD<br>RESILIENT SYSTEMS.",
                sub: "Available for high-complexity engineering challenges, C# (.NET 8) backend systems architecture, and distributed infrastructures.",
                whatsapp: "WHATSAPP DIRECT",
                linkedin: "LINKEDIN PROFILE",
                github: "GITHUB REPOSITORIES",
                email: "EMAIL",
                copyBadge: "[COPY]",
                copiedBadge: "[COPIED!]"
            },
            footer: {
                rights: "All rights reserved. Backend Engineering.",
                inquiries: "Direct Inquiries:",
                follow: "Follow Architecture:",
                academic: "Academic:",
                backToTop: "BACK TO TOP ↑"
            },
            toast: {
                emailCopied: "Email copied to clipboard!"
            },
            cursor: {
                explore: "EXPLORE",
                switchCh: "SWITCH CH",
                play: "PLAY",
                copy: "COPY",
                view: "VIEW",
                dive: "DIVE"
            }
        }
    };

    function detectClientLanguage() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'pt' || saved === 'en') {
                return saved;
            }
        } catch (e) {}

        const navLanguages = navigator.languages || [navigator.language || navigator.userLanguage || ''];
        for (let i = 0; i < navLanguages.length; i++) {
            const l = (navLanguages[i] || '').toLowerCase();
            if (l.startsWith('pt')) {
                return 'pt';
            }
        }
        return 'en';
    }

    function getNestedValue(obj, path) {
        if (!obj) return undefined;
        const parts = path.split('.');
        let curr = obj;
        for (let i = 0; i < parts.length; i++) {
            if (curr == null) return undefined;
            curr = curr[parts[i]];
        }
        return curr;
    }

    const PortfolioI18n = {
        currentLang: 'pt',

        getTranslations(lang = this.currentLang) {
            return TRANSLATIONS[lang] || TRANSLATIONS.en;
        },

        t(key, lang = this.currentLang) {
            const dict = this.getTranslations(lang);
            const val = getNestedValue(dict, key);
            if (val !== undefined) return val;
            const fallback = getNestedValue(TRANSLATIONS.en, key);
            return fallback !== undefined ? fallback : key;
        },

        setLanguage(lang, persist = true) {
            if (lang !== 'pt' && lang !== 'en') {
                lang = 'en';
            }
            this.currentLang = lang;

            if (persist) {
                try {
                    localStorage.setItem(STORAGE_KEY, lang);
                } catch (e) {}
            }

            // Update html lang
            const docLang = lang === 'pt' ? 'pt-BR' : 'en';
            document.documentElement.lang = docLang;
            if (document.documentElement.setAttribute) {
                document.documentElement.setAttribute('lang', docLang);
            }

            this.updateMetaTags();
            this.applyTranslations();
            this.updateSwitcherButtons();

            // Refresh ScrollTrigger to ensure pin/scroll calculation remains perfect
            if (window.ScrollTrigger) {
                requestAnimationFrame(() => {
                    window.ScrollTrigger.refresh();
                });
            }

            // Dispatch global event for other components (cursor, audio, etc.)
            window.dispatchEvent(new CustomEvent('portfolio:languageChanged', {
                detail: { lang, i18n: this }
            }));
        },

        updateMetaTags() {
            const dict = this.getTranslations();
            if (dict.meta) {
                if (dict.meta.title) document.title = dict.meta.title;

                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc && dict.meta.description) metaDesc.setAttribute('content', dict.meta.description);

                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle && dict.meta.ogTitle) ogTitle.setAttribute('content', dict.meta.ogTitle);

                const ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc && dict.meta.ogDescription) ogDesc.setAttribute('content', dict.meta.ogDescription);
            }
        },

        updateSwitcherButtons() {
            const btns = document.querySelectorAll('[data-lang-btn]');
            btns.forEach(btn => {
                const btnLang = btn.dataset.langBtn;
                if (btnLang === this.currentLang) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                }
            });
        },

        applyTranslations() {
            // 1. Text elements
            const textNodes = document.querySelectorAll('[data-i18n]');
            textNodes.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const val = this.t(key);
                if (val !== undefined) {
                    el.textContent = val;
                }
            });

            // 2. HTML elements
            const htmlNodes = document.querySelectorAll('[data-i18n-html]');
            htmlNodes.forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                const val = this.t(key);
                if (val !== undefined) {
                    el.innerHTML = val;
                }
            });

            // 3. Attribute translations (e.g. data-i18n-attr="title:hud.audioTitle|aria-label:drawer.closeAria")
            const attrNodes = document.querySelectorAll('[data-i18n-attr]');
            attrNodes.forEach(el => {
                const attrSpec = el.getAttribute('data-i18n-attr');
                if (!attrSpec) return;
                const pairs = attrSpec.split('|');
                pairs.forEach(pair => {
                    const [attrName, key] = pair.split(':').map(s => s.trim());
                    if (attrName && key) {
                        const val = this.t(key);
                        if (val !== undefined) {
                            el.setAttribute(attrName, val);
                        }
                    }
                });
            });
        },

        init() {
            const initialLang = detectClientLanguage();
            this.setLanguage(initialLang, false);

            // Bind click handlers on language buttons
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-lang-btn]');
                if (btn) {
                    const targetLang = btn.dataset.langBtn;
                    if (targetLang && targetLang !== this.currentLang) {
                        this.setLanguage(targetLang, true);
                    }
                }
            });
        }
    };

    window.PortfolioI18n = PortfolioI18n;

    // Run as early as possible once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => PortfolioI18n.init());
    } else {
        PortfolioI18n.init();
    }
})();
