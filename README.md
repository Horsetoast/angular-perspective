Angular Depth (ngDepth)
====
A simple angular directive that lets you create an impression of depth from a midpoint relative to your mouse position.
See the [demo](http://www.ngdepth.matuspeciar.com).
## Installation

Install via __Download__ or

__Bower__
```bash
bower install --save angular-depth
```
## Usage
Include ngDepth.directive.min.js (or the unminified version) in your Angular app.

To activate the directive, use attribute:
```bash
ng-depth
```

With one or more of the following attributes:
```bash
z-depth="value" (both axes, same value)
x-depth="value" (x axis)
y-depth="value" (y axis)
z-rotate="value" (both axes same value)
```
value = rational number as a factor of movement, negative value will reverse the direction

### Example usage
For a depth effect on both axes with different values.
(It is possible to set only one axis, unspecified axis will remain constant).
```bash
<img src="./images/example.png" x-depth="5" y-depth="0.7" ng-depth>
<h1 z-rotate="1.5" ng-depth>Just try me!</h1>
```

## Options
The directive currently supports two config parameters:

| Setting | Description |
| --- | --- |
| 'depthFactor' | Global variable that will influence the movement of all ng-depth elements |
| 'focalPoint' | Defines what should be used to calculate default midpoint. Supports 3 options: *'elements'* = each element has its own midpoint, *'parent'* = parent's midpoint, *'window'* = browser window's midpoint|

To configure the directive, use this provider method:
```bash
app.config(['ngDepthConfigProvider', function(ngDepthConfigProvider) {
    ngDepthConfigProvider.config = {
        'depthFactor': 20,
        'focalPoint': 'window'
    };
}]);
```
