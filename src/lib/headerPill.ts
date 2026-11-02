// Small-screen "pill" header styles, shared by every page that uses <PageHeader pill>.
// From md up these classes do nothing and the regular full-width bar shows.

// The bar itself: drops its background and becomes a centred row of pills
export const PILL_BAR =
  "max-md:pointer-events-auto max-md:mx-auto max-md:w-fit max-md:max-w-[calc(100%-7rem)] max-md:items-center max-md:justify-center max-md:gap-2 max-md:p-0 max-md:border-0 max-md:bg-none max-md:bg-transparent";

// The title: a label, not a button (same height and tint, no border or shadow)
export const PILL_TITLE =
  "max-md:flex max-md:h-10 max-md:min-w-0 max-md:items-center max-md:rounded-md max-md:bg-gradient-to-r max-md:from-blue-400/15 max-md:to-purple-600/15 max-md:px-4 max-md:text-base max-md:backdrop-blur-2xl";

// Buttons next to the title (back, add, save...): 40px tall, and the same light
// outline style as the nav buttons instead of the solid black default
export const PILL_BUTTON =
  "max-md:h-10 max-md:min-w-10 max-md:shrink-0 max-md:px-3 max-md:border max-md:bg-transparent max-md:bg-gradient-to-r max-md:from-blue-400/15 max-md:to-purple-600/15 max-md:text-foreground max-md:shadow-xs max-md:backdrop-blur-2xl max-md:hover:bg-gray-200 dark:max-md:border-input dark:max-md:hover:bg-input/50";
