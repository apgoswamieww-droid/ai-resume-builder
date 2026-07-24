# Project Context

## Purpose

This document provides the AI agent with the context needed to make informed development decisions.

It explains the project's priorities, expectations, and long-term direction from an engineering perspective.

This document should influence decision-making, not replace project documentation.

---

# Project Summary

AI Resume Builder is an AI-powered SaaS application that helps users create, improve, and manage professional resumes.

The long-term objective is to build a complete career platform that assists users throughout the entire job search journey.

Every implementation should move the project closer to that vision.

---

# Primary Objective

The primary objective is to help users create professional resumes with the least amount of effort while maintaining high quality and full control over the final result.

When making implementation decisions, prioritize improvements that directly support this objective.

---

# Product Boundaries

Avoid implementing features outside the project's defined scope unless explicitly requested.

Keep the platform focused on career-related workflows.


# Success Definition

A successful feature is one that:

- Solves a real user problem.
- Feels intuitive to use.
- Integrates naturally with the existing product.
- Improves the overall user experience.
- Does not increase unnecessary complexity.

Completing a feature is not enough if it negatively affects the maintainability of the project.

---

# Development Priorities

When multiple tasks compete for attention, prioritize them in the following order:

1. Correctness
2. User Experience
3. Maintainability
4. Simplicity
5. Performance
6. Extensibility

Avoid sacrificing long-term quality for short-term speed.

---

# Product Mindset

Always think from the user's perspective.

Before implementing any feature, consider:

- Does this solve an actual problem?
- Is the workflow intuitive?
- Can the feature be simplified?
- Does it fit naturally within the product?

Avoid adding functionality simply because it is technically possible.

---

# Decision Guidelines

When making implementation decisions:

- Reuse existing functionality whenever practical.
- Prefer incremental improvements over complete rewrites.
- Keep solutions consistent with the rest of the project.
- Reduce future maintenance effort.
- Minimize unnecessary dependencies.

Every decision should improve the project rather than merely complete a task.

---

# Feature Development

New features should:

- Fit naturally into existing workflows.
- Follow established project conventions.
- Remain modular.
- Be easy to extend.
- Avoid creating technical debt.

Large features should be broken into smaller logical milestones.

---

# User Experience Expectations

Every interaction should feel:

- Fast
- Clear
- Predictable
- Professional
- Accessible

Complexity should remain behind the scenes whenever possible.

---

# Change Management

Before making significant changes:

- Understand the existing implementation.
- Evaluate the impact on related modules.
- Preserve backward compatibility whenever practical.
- Minimize unnecessary disruption.

Avoid changing stable functionality without a clear benefit.

---

# Communication

When proposing solutions:

- Explain the reasoning.
- Highlight trade-offs.
- Identify assumptions.
- Mention potential risks.

Do not present assumptions as facts.

---

# Long-Term Thinking

Always consider how today's implementation will affect future development.

Prefer solutions that:

- Scale naturally.
- Reduce maintenance effort.
- Encourage reuse.
- Keep the codebase organized.

Short-term convenience should not compromise long-term project health.

---

# Out of Scope

This document does not define:

- Coding conventions
- Technical architecture
- Technology choices
- Database design
- API standards
- Security policies

Those responsibilities belong to their respective documentation.

---

# Final Reminder

Your responsibility is not simply to generate code.

Your responsibility is to help build a reliable, maintainable, and successful product through thoughtful engineering decisions.