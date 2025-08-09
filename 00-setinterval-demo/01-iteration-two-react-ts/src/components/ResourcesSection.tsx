import React from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  link,
  linkText,
}) => (
  <article className="resource-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      {linkText}
    </a>
  </article>
);

const ResourcesSection: React.FC = () => {
  const resources: ResourceCardProps[] = [
    {
      title: "MDN Web Docs",
      description: "Comprehensive documentation on setInterval and Web Workers",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/setInterval",
      linkText: "setInterval Documentation",
    },
    {
      title: "Web Workers Guide",
      description: "Learn how to use Web Workers for background processing",
      link: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers",
      linkText: "Using Web Workers",
    },
    {
      title: "Performance Best Practices",
      description:
        "Tips for optimizing JavaScript performance in web applications",
      link: "https://web.dev/optimize-long-tasks/",
      linkText: "Optimize Long Tasks",
    },
    {
      title: "Real-world Examples",
      description: "See more demos and practical implementations",
      link: "https://github.com/mdn/dom-examples/tree/main/web-workers",
      linkText: "MDN Web Worker Examples",
    },
  ];

  return (
    <section className="resources-section" aria-labelledby="resources-heading">
      <h2 id="resources-heading">Learn More</h2>
      <div className="resources-grid">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </section>
  );
};

export default ResourcesSection;
