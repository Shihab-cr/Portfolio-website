/* eslint-disable @typescript-eslint/no-explicit-any */
/* debug Projects.tsx — paste temporarily to diagnose data fetching */
import React, { useEffect, useMemo, useState } from "react";
import AnimatedContent from "./AnimatedContent";
import ContactBtn from "./ContactBtn";
import PillFilters from "./PillFilters";
import ProjectDisplay from "./ProjectDisplay";

type Pro = {
  id: number;
  category: string;
  thumbnail: string;
  img: string[];
  title: string;
  skills: string;
  url: string;
  repo: string;
};

const normalizePath = (p?: string) => {
  if (!p) return p;
  if (p.startsWith("/")) return p;
  return p.replace(/^(\.\/|(\.\.\/)+|\/?public\/)/, "/");
};

const ProjectsDebug: React.FC = () => {
  const logo = "/imgs/filter-icon-0.png";
  const url = "/db.json"; // <-- exact name you said you used

  const [raw, setRaw] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setFetchError("");

    fetch(url, { cache: "no-cache" })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          if (!cancelled) setRaw(json);
          console.debug("[ProjectsDebug] fetched json:", json);
        } catch (parseErr) {
          // malformed JSON
          console.error("[ProjectsDebug] JSON parse error:", parseErr);
          if (!cancelled) {
            setFetchError("Failed to parse JSON from " + url);
            setRaw(text);
          }
        }
      })
      .catch((err) => {
        console.error("[ProjectsDebug] fetch error:", err);
        if (!cancelled) setFetchError(String(err));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const projectArray = useMemo<Pro[]>(() => {
    if (!raw) return [];
    // handle { projects: [...] } or { data: [...] } wrappers
    if (raw.projects && Array.isArray(raw.projects)) {
      return raw.projects.map((p: any) => ({ ...p, thumbnail: normalizePath(p?.thumbnail) }));
    }
    if (raw.data && Array.isArray(raw.data)) {
      return raw.data.map((p: any) => ({ ...p, thumbnail: normalizePath(p?.thumbnail) }));
    }
    if (Array.isArray(raw)) {
      return raw.map((p: any) => ({ ...p, thumbnail: normalizePath(p?.thumbnail) }));
    }
    if (typeof raw === "object") {
      return Object.entries(raw).map(([k, v]) => {
        const obj = v as any;
        const id = (obj && (obj.id ?? obj._id)) ?? k;
        return { id, ...obj, thumbnail: normalizePath(obj?.thumbnail) } as Pro;
      });
    }
    return [];
  }, [raw]);

  // filter state and derived filtered list
  const [filter, setFilter] = useState<string>("all");
  const filteredProjects = useMemo(() => {
    const f = (filter || "all").toLowerCase();
    if (!projectArray.length) return [];
    if (f === "all" || f === "") return projectArray;
    return projectArray.filter(p => (p.category || "").toLowerCase().includes(f) || (p.title || "").toLowerCase().includes(f));
  }, [projectArray, filter]);

  return (
    <div className="flex flex-col gap-10 projects -z-0">
      <div className="flex flex-row justify-between jus -z-0">
        <AnimatedContent distance={150} direction="horizontal" reverse={false} duration={1.2} ease="power3.out" initialOpacity={0.0} animateOpacity scale={1.1} threshold={0.2} delay={0.9}>
          <h2 className="text-5xl">Projects</h2>
        </AnimatedContent>

        <AnimatedContent distance={150} direction="horizontal" reverse={true} duration={1.2} ease="power3.out" initialOpacity={0.0} animateOpacity scale={1.1} threshold={0.2} delay={0.9}>
          <ContactBtn />
        </AnimatedContent>
      </div>

      <div className="text-white pb-7 flex gap-7 border-b-2 border-b-paragraph">
        <PillFilters
          logo={logo}
          items={[
            { label: "All", value: "all", onClick: () => setFilter("all") },
            { label: "3D-Models", value: "3d", onClick: () => setFilter("3d") },
            { label: "Game-Dev", value: "game", onClick: () => setFilter("game") },
            { label: "Frontend", value: "ui", onClick: () => setFilter("ui") },
            { label: "Animation", value: "animation", onClick: () => setFilter("animation") },
          ]}
        />
      </div>

      
      <ProjectDisplay projects={filteredProjects} isLoading={isLoading} error={fetchError} />
    </div>
  );
};

export default ProjectsDebug;
