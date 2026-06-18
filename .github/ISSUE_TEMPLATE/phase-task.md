---
name: Phase task
description: Track an Arcanea Agent execution slice
title: "[Phase] "
labels: [arcanea-bootstrap]
body:
  - type: textarea
    id: goal
    attributes:
      label: Goal
      description: What should this task accomplish?
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance criteria
      description: Concrete proof this is done.
    validations:
      required: true
  - type: textarea
    id: verification
    attributes:
      label: Verification
      description: Commands, logs, screenshots, or other evidence.
    validations:
      required: true
  - type: textarea
    id: non-goals
    attributes:
      label: Non-goals
      description: What must not be changed?
---
