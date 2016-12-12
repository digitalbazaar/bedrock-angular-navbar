# bedrock-angular-navbar ChangeLog

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
