import { Sidebar } from "@/components/sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(20%,25rem),1fr]">
      <Sidebar />
      <section className="relative z-[15] w-full bg-[radial-gradient(#cacaca08_1px,transparent_1px)] text-neutral-200 [background-size:16px_16px]">
        {children}
      </section>
    </div>
  );
}
