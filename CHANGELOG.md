# bedrock-angular-navbar ChangeLog

## 4.0.6 - 2017-06-05

### Fixed
- Fix selector.

## 4.0.5 - 2017-06-02

### Changed
- Update deps.

## 4.0.4 - 2017-06-02

### Fixed
- Add bootstrap theme.css.

## 4.0.3 - 2017-06-01

### Fixed
- Add `bootstrap` dependency.

## 4.0.2 - 2017-06-01

### Fixed
- Add missing navbar.less.

## 4.0.1 - 2017-06-01

### Changed
- **BREAKING** Change component name to `bedrock.navbar` to match current
  conventions.

## 4.0.0 - 2017-05-30

### Changed
- **BREAKING**: Switch package manager from bower to npm.
- **BREAKING**: Replace requirejs/amd with ES6 import.
- Angular 1.6.x is required.

## 3.4.1 - 2017-04-28

### Fixed
- Remove erroneous `collapse` class that was causing unnecessary
  navbar animations.
- Do not show navbar item as active during route change.

## 3.4.0 - 2017-04-25

### Fixed
- Remove erroneous `data-toggle` that was overriding
  uib-collapse directive causing extra animation.

### Added
- Expose `collapse` function for navbar controller.

## 3.3.0 - 2017-02-27

### Added
- Add `collapse` function to navbar service.

## 3.2.0 - 2017-01-06

### Added
- `route.vars.navbar.display` may be used to display only specific elements.
- Add `tenant` element which may be used to brand routes.

## 3.1.4 - 2016-12-16

### Fixed
- Override `$routeProvider` to set route default vars.

## 3.1.3 - 2016-12-11

### Fixed
- Do not show navbar menu when there are no submenus.

## 3.1.2 - 2016-12-11

### Fixed
- Ensure changes to `route.vars.navbar` are reflected.
- Remove obsolete `version` from bower.json.

## 3.1.1 - 2016-12-11

### Fixed
- Do explicit check for `route.vars` on `$rootScope`.

## 3.1.0 - 2016-12-11

### Added
- Allow routes to disable navbar via `vars`.

## 3.0.6 - 2016-09-15

### Changed
- Catch and show menu init errors.

## 3.0.5 - 2016-07-15

### Fixed
- Fix bug where navbar scope is not updated post menu initialization. Wait
  for Promise returned from all `menu.init` functions and then apply scope.

## 3.0.4 - 2016-06-28

### Changed
- Remove br-alerts and depend on it from bedrock-angular v2.3.1+.

## 3.0.3 - 2016-06-21

### Changed
- Use map function.
- Use file naming convention.

## 3.0.2 - 2016-05-22

### Fixed
- Active class for selected navbar item.

## 3.0.1 - 2016-04-29

### Changed
- Convert navbar-plugin to component.

## 3.0.0 - 2016-04-27

- See git history for changes.
