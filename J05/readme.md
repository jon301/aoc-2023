# Need

- File parsing functions

- Mapping functions
Create One Map function to convert a SEED NUMBER to a SOIL NUMBER
Create One Map function to convert a SOIL NUMBER to a FERTILIZER NUMBER
...

## Mapping function example: seed-to-soil

destination range start / source range start / range length.

seed-to-soil map:
50 98 2
52 50 48

soil 50/51 corresponds to seed 98/99
soil 52...99 (52+48-1) corresponds to seed 50...97 (50+48-1)

edge case:
soil 10 corresponds to seed 10

## Goal

- find the lowest location number that corresponds to any of the initial seeds
- What is the lowest location number that corresponds to any of the initial seed numbers?