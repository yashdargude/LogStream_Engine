"use client";

import { Box, Briefcase, Home, Cloud, Sparkles, Lock } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

export default function ProjectGrid() {
  const projects = [
    {
      title: "E-commerce",
      desc: "Scalable e-commerce platform for businesses. Manage inventory, process payments, and provide seamless shopping experiences globally.",
      icon: <Box className="h-6 w-6 text-black dark:text-neutral-400" />,
      quote: "“Commerce is the engine of progress.”",
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    },
    {
      title: "Job Board",
      desc: "Remote hiring made easy. Connect top talent with the best companies. AI-driven job matching ensures efficiency.",
      icon: <Briefcase className="h-6 w-6 text-black dark:text-neutral-400" />,
      quote: "“Your career is your business. Own it.”",
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    },
    {
      title: "Real Estate",
      desc: "Next-gen property management portal. Search, list, and buy properties with integrated virtual tours and AI-powered recommendations.",
      icon: <Home className="h-6 w-6 text-black dark:text-neutral-400" />,
      quote: "“Home is where your story begins.”",
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    },
    {
      title: "SaaS",
      desc: "Business solutions via Creator/Influencer collaborations. Automate workflows, analyze trends, and grow revenue with data-driven insights.",
      icon: <Cloud className="h-6 w-6 text-black dark:text-neutral-400" />,
      quote: "“Software is eating the world.”",
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    },
    {
      title: "Cybersecurity",
      desc: "Protect your digital assets with advanced security solutions. Monitor threats, secure transactions, and prevent breaches.",
      icon: <Lock className="h-6 w-6 text-black dark:text-neutral-400" />,
      quote: "“Security is not a product, but a process.”",
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    },
  ];

  return (
    <ul className="dark grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {projects.map((project, index) => (
        <GridItem
          key={index}
          area={project.area}
          icon={project.icon}
          title={project.title}
          description={project.desc}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-white dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
