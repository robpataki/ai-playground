import React from "react";
import { render, screen } from "@testing-library/react";
import ResourcesSection from "./ResourcesSection";

describe("ResourcesSection", () => {
  it("renders the section heading", () => {
    render(<ResourcesSection />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Learn More");
  });

  it("renders four resource cards", () => {
    render(<ResourcesSection />);

    const resourceCards = screen.getAllByRole("article");
    expect(resourceCards).toHaveLength(4);
  });

  it("displays MDN Web Docs resource", () => {
    render(<ResourcesSection />);

    const title = screen.getByText("MDN Web Docs");
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "Comprehensive documentation on setInterval and Web Workers"
    );
    expect(description).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: "setInterval Documentation",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://developer.mozilla.org/en-US/docs/Web/API/setInterval"
    );
  });

  it("displays Web Workers Guide resource", () => {
    render(<ResourcesSection />);

    const title = screen.getByText("Web Workers Guide");
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "Learn how to use Web Workers for background processing"
    );
    expect(description).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Using Web Workers" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
    );
  });

  it("displays Performance Best Practices resource", () => {
    render(<ResourcesSection />);

    const title = screen.getByText("Performance Best Practices");
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "Tips for optimizing JavaScript performance in web applications"
    );
    expect(description).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Optimize Long Tasks" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://web.dev/optimize-long-tasks/"
    );
  });

  it("displays Real-world Examples resource", () => {
    render(<ResourcesSection />);

    const title = screen.getByText("Real-world Examples");
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      "See more demos and practical implementations"
    );
    expect(description).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "MDN Web Worker Examples" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/mdn/dom-examples/tree/main/web-workers"
    );
  });

  it("has proper accessibility attributes for external links", () => {
    render(<ResourcesSection />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("has proper semantic structure", () => {
    render(<ResourcesSection />);

    const section = screen.getByRole("region", { name: /learn more/i });
    expect(section).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<ResourcesSection />);

    const section = container.querySelector(".resources-section");
    expect(section).toBeInTheDocument();

    const resourcesGrid = container.querySelector(".resources-grid");
    expect(resourcesGrid).toBeInTheDocument();

    const resourceCards = container.querySelectorAll(".resource-card");
    expect(resourceCards).toHaveLength(4);
  });
}); 