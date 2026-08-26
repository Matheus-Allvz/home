# Matheus Alves da Costa 👋

<p align="center">
  <img src="https://raw.githubusercontent.com/Matheus-Allvz/Matheus-Allvz/main/banner.png" alt="Matheus Alves Banner" width="100%" onerror="this.style.display='none'"/>
</p>

<p align="center">
  <strong>🚀 Desenvolvedor Backend C# (.NET 8) | Microsserviços & Clean Architecture</strong><br/>
  🎓 Graduando em Ciência da Computação na <strong>PUC Goiás (CR 8.6)</strong> | 📍 Goiânia, GO - Brasil
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/matheusallvz"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="mailto:workingaccount.matheus@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>
  <a href="https://wa.me/5562993123343"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"/></a>
  <a href="https://matheus-allvz.github.io/portfolio-sticky-sections/"><img src="https://img.shields.io/badge/Portfolio-E5A968?style=for-the-badge&logo=google-chrome&logoColor=black" alt="Portfolio"/></a>
</p>

---

### 👨‍💻 Sobre Mim

Desenvolvedor de Software com atuação focada no ecossistema **C# / .NET 8**, arquitetura de **microsserviços**, mensageria assíncrona com **RabbitMQ** e modelagem relacional de alta performance (**PostgreSQL / SQL Server**).

Atuo na **Actuar**, onde tracei uma trajetória acelerada de evolução técnica: de analista de suporte **N1** (rankeado **5x Top 1** e **1x Top 2** geral) para **N2** (ponto focal de diagnóstico em código, RCA e nota **14.75/15** em avaliação de arquitetura de negócio), sendo promovido a **Desenvolvedor Júnior C#**, atuando diretamente na sustentação, refatoração e evolução de microsserviços de missão crítica.

Sou o criador do **Meppo** (suíte de produtividade que otimizou rotinas operacionais de 6 minutos para meros segundos via integração de APIs) e arquiteto/desenvolvedor do **DataClean Microservice** (engine .NET 8 para parsing multi-formato, higienização heurística e carga massiva de planilhas).

---

### ⚡ Tecnologias & Habilidades

<p align="center">
  <!-- Backend & Languages -->
  <img src="https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white" alt="C#"/>
  <img src="https://img.shields.io/badge/.NET%208-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt=".NET 8"/>
  <img src="https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="ASP.NET Core"/>
  <img src="https://img.shields.io/badge/Clean%20Architecture-2F251E?style=flat-square&logo=blueprint&logoColor=E5A968" alt="Clean Architecture"/>
  <img src="https://img.shields.io/badge/CQRS%20%26%20DDD-43392F?style=flat-square&logo=blueprint&logoColor=E5A968" alt="CQRS"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Entity%20Framework%20Core-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="EF Core"/>
  <img src="https://img.shields.io/badge/Dapper-00599C?style=flat-square&logo=cplusplus&logoColor=white" alt="Dapper"/>
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ"/>
  <img src="https://img.shields.io/badge/Docker%20%26%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/xUnit%20Testing-1572B6?style=flat-square&logo=testinglibrary&logoColor=white" alt="xUnit"/>
</p>

<p align="center">
  <!-- Frontend, Scripting & Hardware -->
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React%20%2F%20Vite-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/C%20(Embedded)-00599C?style=flat-square&logo=c&logoColor=white" alt="C"/>
  <img src="https://img.shields.io/badge/Arduino%20%2F%20Raspberry%20Pi-00979D?style=flat-square&logo=arduino&logoColor=white" alt="Arduino"/>
  <img src="https://img.shields.io/badge/Git%20%26%20GitHub-F05032?style=flat-square&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/Linux%20%2F%20Bash-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux"/>
</p>

---

### 🌟 Destaques & Principais Projetos

#### 1. 🏢 [DataClean Microservice & Studio](https://github.com/Matheus-Allvz/DataClean.Microservice)
> **Ecossistema .NET 8 de Ingestão, Normalização e Validação de Dados**
- Arquitetura em **4 camadas (Clean Architecture)**: Domain, Application, Infrastructure, API.
- **Parser Multi-Formato**: Suporte robusto a XLSX, XLS (OLE2 Compound Document), SpreadsheetML 2003 (XML), CSV com separador automático e ODS.
- **Heurística de Cabeçalhos**: Algoritmo de scoring pontual nas 25 primeiras linhas analisando densidade de texto, unicidade e padrões de dados (CPF, CNPJ, Datas, Telefones).
- **Validação Restritiva de Domínio**: Normalização estrita de limites e enums conforme os contratos do ecossistema Actuar, eliminando falhas silenciosas de gravação.
- **Mensageria & Integração**: PostgreSQL 16 + RabbitMQ + Web Client em React/TypeScript com debounced queue e fallback local.

#### 2. ⚡ [Meppo — Productivity Suite](https://www.linkedin.com/posts/matheusallvz_produtividade-customerexperience-desenvolvimento-activity-7432189024691404802-HZ0r)
> **Engine de Automação e Redução de Sobrecarga Cognitiva**
- Criado por iniciativa própria, revolucionou fluxos operacionais ao **reduzir tarefas de 6 minutos para poucos segundos**.
- Integração de APIs REST com plataformas de atendimento, ClickUp e WhatsApp Web.
- Busca unificada dinâmica, geração instantânea de payloads e templates contextuais para times de N1, N2 e Customer Success.

#### 3. 🔄 [Data Pipelines & Ingestion Engine Engine](https://github.com/Matheus-Allvz)
> **Pipeline de Extração, Engenharia Reversa e Carga Massiva**
- Extração segura de entidades cadastrais e financeiras entre plataformas ERP de academias.
- Chunking inteligente, controle de rate limiting e batch import de milhares de registros sem perda de histórico.

---

### 📊 Estatísticas & Atividade

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Matheus-Allvz&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0e0c0a&title_color=e5a968&text_color=f3f0ea&icon_color=e5a968" alt="Matheus Alves GitHub Stats" height="165"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Matheus-Allvz&layout=compact&theme=tokyonight&hide_border=true&bg_color=0e0c0a&title_color=e5a968&text_color=f3f0ea" alt="Top Languages" height="165"/>
</p>

---

### 🎓 Formação Acadêmica & Certificações

- 🏛️ **Bacharelado em Ciência da Computação** — Pontifícia Universidade Católica de Goiás (PUC-GO) | *2024 - 2029* (CR: **8.6**)
  - *Foco em Algoritmos, Estruturas de Dados, Sistemas Distribuídos, Arquitetura e Design de Software.*
- 📜 **Certificação Interna Actuar**: Regras de Negócio, Arquitetura de Domínio e RCA — Nota **14.75 / 15.0**.
- 📜 **Responsive Web Design** — FreeCodeCamp
- 📜 **Banco de Dados Relacional** — Instituto Federal do Rio Grande do Sul (IFRS)
- 🌐 **Idiomas**: Português (Nativo), Inglês Técnico Avançado (Conversação e documentação).

---

### 📬 Vamos Conversar?

- 💼 **LinkedIn**: [linkedin.com/in/matheusallvz](https://www.linkedin.com/in/matheusallvz)
- 📧 **E-mail**: [workingaccount.matheus@gmail.com](mailto:workingaccount.matheus@gmail.com)
- 💬 **WhatsApp**: [+55 (62) 99312-3343](https://wa.me/5562993123343)
- 🌐 **Portfólio Interativo**: [matheus-allvz.github.io/portfolio-sticky-sections](https://matheus-allvz.github.io/portfolio-sticky-sections/)
