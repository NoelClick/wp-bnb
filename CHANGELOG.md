# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
* Add `ddev` config.
* Create page initializer.
* Add a script to dynamically load pages and their resources.
* Create component renderer.
* Load apartments dynamically from a list (`apartment_list.js`).
* Create footer navigation.
* Create 10 placeholder apartments.
* Create apartment `details` page.
* Create `legal-notice` page.
* Redesign `index.html`.
* Create `list` page.
* Add filtering option to the `list` page.

### Changed
* Structure assets and pages for better overview.
* Update navigaton bar entry (mark entry of current).
* Update home page.
* Migrate styles from vanilla CSS to tailwindcss.
* Update `README.md`.
* Don't show the current apartment in the similar apartments list in detail view.

### Fixed
* Fix returning instead of opening the 404 page if requested page could not found.
* Fix responsiveness of the list page.
* Fix hidden emotion stays hidden after leaving detail page.

### Removed
* Remove old code.
* Removed licensed images, using pixabay images now (rebase).
* Remove unused CSS rules.

<!-- [Unreleased]: https://github.com/NoelClick/wp-bnb/compare/v0.1.0...HEAD -->
<!-- [0.1.0]: https://github.com/NoelClick/wp-bnb/releases/tag/v0.1.0 -->

