# Coding Standards

## Purpose

This document defines the coding standards and development conventions for the AI Resume Builder project.

Its objective is to ensure that all code remains consistent, readable, maintainable, and easy to review regardless of who contributes to the project.

These standards apply to all parts of the codebase.

---

# Core Principles

Every piece of code should be:

- Simple
- Readable
- Consistent
- Maintainable
- Predictable
- Reusable

Readable code is preferred over clever code.

---

# General Guidelines

Developers should:

- Write self-explanatory code.
- Keep implementations as simple as possible.
- Avoid unnecessary complexity.
- Prefer composition over duplication.
- Follow existing project conventions.
- Improve existing code when making related changes.

---

# Naming Conventions

Names should clearly describe their purpose.

Use meaningful names for:

- Variables
- Functions
- Components
- Classes
- Files
- Directories
- Constants

Avoid abbreviations unless they are universally understood.

---

# File Organization

Each file should have a clear responsibility.

Avoid files that become excessively large or contain unrelated logic.

Group related functionality together.

---

# Function Design

Functions should:

- Perform one responsibility.
- Have descriptive names.
- Be easy to understand.
- Minimize side effects.
- Return predictable results.

Break large functions into smaller reusable units whenever appropriate.

---

# Component Design

Components should:

- Have a single responsibility.
- Be reusable.
- Be easy to test.
- Receive only the data they need.
- Avoid unnecessary complexity.

Business logic should not be tightly coupled to presentation.

---

# Code Reuse

Before creating new code:

- Check whether similar functionality already exists.
- Extend reusable solutions where appropriate.
- Avoid copy-and-paste implementations.

Duplication should be minimized throughout the project.

---

# Error Handling

Handle expected errors gracefully.

Error messages should:

- Clearly explain the problem.
- Provide useful context.
- Avoid exposing internal implementation details.

Silent failures should be avoided.

---

# Comments

Code should be written clearly enough that excessive comments are unnecessary.

Use comments only when they explain:

- Business rules
- Complex decisions
- Important assumptions
- Non-obvious behavior

Do not comment obvious code.

---

# Formatting

Formatting should remain consistent across the project.

Follow a single formatting style for:

- Indentation
- Spacing
- Line length
- File structure

Formatting should improve readability rather than personal preference.

---

# Code Reviews

During review, verify that the implementation:

- Solves the intended problem.
- Follows project conventions.
- Does not introduce unnecessary complexity.
- Is easy to understand.
- Is maintainable.
- Does not duplicate existing functionality.

Constructive feedback should always be encouraged.

---

# Refactoring

Refactor code when it improves:

- Readability
- Reusability
- Maintainability
- Simplicity

Avoid large-scale refactoring unless there is clear value.

---

# Technical Debt

When technical debt is introduced:

- Document the reason.
- Keep the impact minimal.
- Plan for future improvement.

Technical debt should never become permanent by accident.

---

# Testing Mindset

New code should be written with testing in mind.

Implementations should be structured so that behavior can be verified easily.

Code that is difficult to test often indicates a design issue.

---

# Documentation

When introducing significant development changes:

- Update relevant documentation.
- Remove outdated information.
- Keep documentation synchronized with the implementation.

Documentation is part of the development process.

---

# Pull Request Guidelines

Every pull request should:

- Solve a single logical problem.
- Remain easy to review.
- Avoid unrelated changes.
- Include updated documentation when required.

# Code Smells

Avoid introducing:

- Large classes
- Large components
- Long functions
- Deep nesting
- Duplicate logic

# Scope

This document defines coding conventions only.

Architecture, technology choices, database design, APIs, security practices, product planning, and project vision are documented separately.

---

# Guiding Principle

Write code that another developer can confidently understand, modify, and extend months later without requiring additional explanation.