// Small-screen "pill" header styles, shared by every page that uses <PageHeader pill>.
// From md up these classes do nothing and the regular full-width bar shows.
// One bordered pill holding the nav-style buttons and the title.

// The parent pill: centred, just a border (no background), holds the buttons and the title.
// The blur keeps the text readable when content scrolls underneath.
export const PILL_BAR =
  "max-md:pointer-events-auto max-md:mx-auto max-md:w-fit max-md:max-w-[calc(100%-7rem)] max-md:items-center max-md:justify-center max-md:gap-1 max-md:rounded-xl max-md:border max-md:border-gray-300 dark:max-md:border-gray-600 max-md:p-1 max-md:bg-transparent max-md:bg-none max-md:backdrop-blur-md";

// The title: plain text inside the parent pill
export const PILL_TITLE = "max-md:min-w-0 max-md:px-2.5 max-md:text-base";

// Buttons inside the pill (back, add, save...): each keeps the nav buttons' look:
// thin border, light blue-to-purple gradient, tiny shadow, instead of solid black.
// Uses bg-linear-to-r, not bg-gradient-to-r: <Button>'s class merger reads
// bg-gradient-* as a colour and would drop bg-transparent, leaving it dark.
export const PILL_BUTTON =
  "max-md:size-9 max-md:shrink-0 max-md:px-0 max-md:border max-md:bg-transparent max-md:bg-linear-to-r max-md:from-blue-400/15 max-md:to-purple-600/15 max-md:text-foreground max-md:shadow-xs max-md:backdrop-blur-2xl max-md:hover:bg-gray-200 dark:max-md:border-input dark:max-md:hover:bg-input/50";
