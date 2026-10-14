import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClipReveal from "@/components/ClipReveal";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${project.category}`,
    description: project.summary
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="pt-[92px]">
        <header className="shell pt-[6vh]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
            <span className="t-eyebrow">{project.category}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Case {project.idx} · {project.year}
            </span>
          </div>
          <h1 className="t-display mt-8 text-[clamp(46px,9vw,180px)] leading-[0.9]">
            {project.name}
          </h1>
          <p className="t-lead mt-8 max-w-[48ch] text-muted">{project.summary}</p>
        </header>

        <section className="shell mt-[8vh]">
          <ClipReveal className="relative aspect-video w-full overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} — ${project.category}`}
              className="h-full w-full object-cover"
            />
          </ClipReveal>
        </section>

        <section className="shell py-[12vh]">
          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <span className="t-eyebrow col-span-12 lg:col-span-3">Case study</span>
            <div className="col-span-12 flex max-w-[64ch] flex-col gap-6 text-[clamp(16px,1.15vw,20px)] leading-relaxed text-bone/85 lg:col-span-8 lg:col-start-4">
              {project.story.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="shell pb-[10vh]">
          <div className="rule" />
          <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            <div>
              <dt className="t-eyebrow">Year</dt>
              <dd className="mt-3 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="t-eyebrow">Scope</dt>
              <dd className="mt-3 flex flex-col gap-1 text-sm text-muted">
                {project.scope.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="t-eyebrow">Stack</dt>
              <dd className="mt-3 flex flex-col gap-1 text-sm text-muted">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="t-eyebrow">Outcome</dt>
              <dd className="mt-3 text-sm text-muted">{project.outcome}</dd>
            </div>
          </dl>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm transition-colors hover:border-bone"
              data-cursor="Visit site"
            >
              Visit live site
              <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </a>
          )}
        </section>

        <section className="shell pb-[14vh]">
          <Link
            href={`/work/${next.slug}`}
            className="group block border-t border-line pt-8"
            data-cursor="Next case"
          >
            <span className="t-eyebrow">Next case</span>
            <div className="mt-4 flex items-end justify-between gap-6">
              <h2 className="t-display text-[clamp(34px,6.5vw,120px)] leading-none">
                {next.name}
              </h2>
              <span className="mb-1.5 text-3xl transition-transform duration-500 group-hover:translate-x-3">
                →
              </span>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
