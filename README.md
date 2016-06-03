#Angular Perspective (ngPerspective)

A simple angular directive that lets you create an impression of perspective from a chosen point in relation to your mouse position.
See the [demo](http://www.ngdepth.matuspeciar.com).

## Installation

Install via __Download__ or

__Bower__
```bash
bower install --save angular-perspective
```
## Usage
Include ngPerspective.directive.min.js (or the unminified version) in your Angular app.

To activate the directive, use attribute:
```bash
ng-perspective
```

With one or more of the following attributes:
```bash
move-z="value" (both axes, same value)
move-x="value" (x axis)
move-y="value" (y axis)
rotate-z="value" (both axes same value)
```
value = rational number as a factor of movement, negative value will reverse the direction

### Example usage
For a perspective effect on both axes with different values.
(It is possible to set only one axis, unspecified axis will remain constant).
```bash
<img src="./images/example.png" move-x="5" move-y="0.7" ng-depth>
<h1 rotate-z="1.5" ng-depth>Just try me!</h1>
```

## Options
The directive currently supports two config parameters:

| Setting | Description |
| --- | --- |
| 'perspectiveFactor' | Global variable that will influence the movement of all ng-perspective elements |
| 'focalPoint' | Defines what should be used to calculate default midpoint. Supports 3 options: *'elements'* = each element has its own midpoint, *'parent'* = parent's midpoint, *'window'* = browser window's midpoint|

To configure the directive, use this provider method:
```bash
app.config(['ngPerspectiveConfigProvider', function(ngPerspectiveConfigProvider) {
    ngPerspectiveConfigProvider.config = {
        'perspectiveFactor': 20,
        'focalPoint': 'window'
    };
}]);
```
