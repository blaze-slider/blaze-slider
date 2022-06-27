---
sidebar_position: 1
---

# Setup

Blaze slider library comes with 1 JS file and 1 CSS file. Refer to [Installation](docs/installation) section on how to include them in your website.

## Required HTML markup

Blaze slider requires a specific HTML markup to work properly, which is shown below:

```html
<div class="blaze-slider">
  <div class="blaze-container">
    <div class="blaze-track-container">
      <div class="blaze-track">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
      </div>
    </div>
  </div>
</div>
```

Basically, you need to wrap the slides with this structure `.blaze-slider > .blaze-container > .blaze-track-container > .blaze-track`.

:::caution
`div.blaze-track` must only contain the slides as it's children and nothing else. You put anything inside other containers.

:::

## Adding Navigation and Pagination

To add navigation (previous and next buttons) functionality to slider, you must add buttons with class `blaze-next` and `blaze-prev`

To add pagination functionality to slider, you must add div with class `blaze-pagination`. The pagination buttons will be created and added inside this element by the blaze-slider library.

Navigation buttons and Pagination container can be added anywhere inside the structure shown above ( except inside the `div.blaze-track` - because `div.blaze-track` can only contain the slides ) .

### Example

```html
<div class="blaze-slider">
  <div class="blaze-container">
    <div class="blaze-track-container">
      <div class="blaze-track">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
      </div>
    </div>

    <!-- navigation buttons -->
    <button class="blaze-prev">previous</button>
    <button class="blaze-next">previous</button>

    <!-- pagination container -->
    <div class="pagination"></div>
  </div>
</div>
```

You are not limited to just adding the navigation buttons and pagination, you can even add a complex structure containing them and they do not have to be inside the same structure.

### Example

```html
<div class="blaze-slider">
  <div class="blaze-container">
    <div class="blaze-track-container">
      <div class="blaze-track">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
      </div>

      <!-- pagination container -->
      <div class="my-pagination-container">
        <div class="pagination"></div>
      </div>
    </div>

    <!-- navigation buttons -->
    <div class="my-nav-container">
      <button class="blaze-prev">previous</button>
      <button class="blaze-next">previous</button>
    </div>
  </div>
</div>
```
