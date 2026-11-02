// Small-screen "pill" header styles, shared by every page that uses <PageHeader pill>.
// From md up these classes do nothing and the regular full-width bar shows.
// Looks like the side nav: one gradient pill holding plain icon buttons and the title.

// The parent pill: centred, nav-style gradient, holds the buttons and the title
export const PILL_BAR =
  "max-md:pointer-events-auto max-md:mx-auto max-md:w-fit max-md:max-w-[calc(100%-7rem)] max-md:items-center max-md:justify-center max-md:gap-1 max-md:rounded-xl max-md:border-0 max-md:p-1 max-md:bg-transparent max-md:bg-linear-to-r max-md:from-blue-400/15 max-md:to-purple-600/15 dark:max-md:from-blue-400/15 dark:max-md:to-purple-600/15 max-md:shadow-sm max-md:backdrop-blur-md";

// The title: plain text inside the parent pill
export const PILL_TITLE = "max-md:min-w-0 max-md:px-2.5 max-md:text-base";

// Buttons inside the pill (back, add, save...): plain icon buttons like the nav's.
// bg-transparent + bg-none clear both the solid default and the outline gradient on
// small screens. (Use bg-linear-* names, not bg-gradient-*, in anything passed to
// <Button>: its class merger reads bg-gradient-* as a colour and drops bg-transparent.)
export const PILL_BUTTON =
  "max-md:size-9 max-md:shrink-0 max-md:rounded-xl max-md:border-0 max-md:bg-transparent max-md:bg-none max-md:px-0 max-md:text-foreground max-md:shadow-none max-md:hover:bg-gray-200/60 dark:max-md:hover:bg-input/50";
