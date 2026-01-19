---
eleventyExcludeFromCollections: true
permalink: false
---

# Creating a Box Component in React Native with Styled Systems

**Original URL:** https://www.fullstack.com/labs/resources/blog/creating-a-box-component-in-react-native-with-styled-systems
**Author:** Felipe Moyano (FullStack Team)
**Backup Date:** 2025-01-19

---

Enforce consistent theme use throughout your application with a reusable Box component.

## What is a theme?

A theme is a series of configurable design constraints such as colors, typographies, font sizes, font weights, spacing scale, etc.

## Why is a theme important?

When it comes to design, consistency is key to making a final product that looks polished. Sharing the same color palette, spacing between elements, and breakpoints across all components goes a long way in creating a pleasant UI. You can, of course, achieve this without implementing a theme, but being constrained by your theme will make it harder to deviate from it. It will also make it easier to make decisions as you build. Instead of asking yourself if a support text looks better at 15px or 16px, you simply stick to your scale. In that case, it's either a *small text* or a *regular text*.

## The Box component

The box component is the basic building block to implement our theme in our application. We can think of it as a `View` with special style props that will receive the keys on the theme object and map them to their corresponding values.

Let's start by creating a new React Native app with [expo-cli](https://docs.expo.io/get-started/installation/):

```bash
expo init BoxApp
```

Follow the instructions on your console and pick the blank template under managed workflow.

After the installation completes, switch to your project's folder and run:

```bash
yarn add styled-system @emotion/core @emotion/native emotion-theming
```

Now let's add a theme file for our application:

```javascript
/* theme.js */
export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontWeights: {
    body: "400",
    heading: "700",
    bold: "900",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#1F2933",
    white: "#fff",
    background: "#E4E7EB",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
};
```

We'll be using the [Styled System](https://styled-system.com/) library to build our Box. Styled System provides a collection of utility functions that allows us to map styles to component properties based on a global theme object.

Let's go ahead and create a file, `system.js` under `src/utils` to put some of the boilerplate necessary to create our components:

```javascript
/* utils/system.js */
import {
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  shadow,
  compose,
} from "styled-system";

export const viewProps = compose(
  layout,
  color,
  space,
  border,
  position,
  shadow,
  flexbox
);
```

Now we can create a `Box.js` file under a components directory:

```javascript
/* components/Box.js */
import React from "react";
import styled from "@emotion/native";
import { viewProps } from "../utils/system";
import { useTheme } from "emotion-theming";

const StyledBox = styled.View(viewProps);

/* Since shadows in React Native consist of multiple properties,
   we include this function to help us map them from one key to
   multiple values. */
function mapShadowToStyle(key, theme) {
  const _obj = theme.shadows[key];
  if (!_obj) return {};
  return _obj;
}

export const Box = React.forwardRef((props, ref) => {
  const { shadow, style, children, ...rest } = props;
  const theme = useTheme();
  const _shadow = shadow && mapShadowToStyle(shadow, theme);
  
  return (
    <StyledBox ref={ref} {...rest} style={[style, { ..._shadow }]}>
      {children}
    </StyledBox>
  );
});

Box.displayName = "Box";
```

Great, now let's go back to our `App.js` and start using our Box component. But first, we have to make sure to include a ThemeProvider so that Styled System can pull in our global theme and apply it to the Box. Once we've done that we can put our newly created Box component into action:

```javascript
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { ThemeProvider } from "emotion-theming";
import theme from "./src/theme";
import { Box } from "./src/components/Box";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box flex={1} alignItems="center" backgroundColor="background">
        <Box marginTop={6} padding={4} backgroundColor="primary" shadow="md">
          <Text style={{ color: "white" }}>Hello from a box component!</Text>
        </Box>
      </Box>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
```

Notice that the numerical values we're using on the margin and padding properties don't map to pixels, but instead use the values defined previously on our space scale:

```javascript
space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
```

We can also make use of our color palette and reference it directly on the backgroundColor properties and even use the shadows on our theme!

## What about text?

It would certainly be nice if in the example above we could also use our theme to render the message. Since React Native requires us to place text inside Text components (unlike web browsers, where any element can have inner text), we can't use our Box to replace Text components.

Personally, I don't find it as useful to define a general purpose text component. Instead, I prefer defining typographic components that have a clear purpose, such as Heading, Content, etc.

Let's look at a possible implementation for a Heading component:

```javascript
import styled from "@emotion/native";
import React from "react";
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  border,
  fontSize,
  fontWeight,
  compose,
} from "styled-system";

export const textProps = compose(
  typography,
  space,
  color,
  layout,
  flexbox,
  border
);

export const StyledText = styled.Text(textProps);

export function Heading({
  color = "text",
  size = "xl",
  fontWeight = "heading",
  ...props
}) {
  return (
    <StyledText
      color={color}
      fontWeight={fontWeight}
      fontSize={size}
      {...props}
    />
  );
}

Heading.displayName = "Heading";
```

Great, now we have a Heading with some useful defaults that we can reuse in our application. Let's go back to our `App.js` and include this Heading component:

```javascript
/* App.js */
<Box flex={1} alignItems="center" backgroundColor="background">
  <Heading mt={4}>I'm a Heading!</Heading>
  <Box marginTop={6} padding={4} backgroundColor="primary" shadow="md">
    <Text style={{ color: "white" }}>Hello from a box component!</Text>
  </Box>
</Box>
```

## Conclusion

These two components will give us a solid foundation to build on our theme and implement a design system throughout our application. From here, we could reuse them to implement layout primitives such as a Stack, Inline, or Grid, and typography components such as SubHeading, Content or TextLink. The theme object can also be extended with your brand colors, new shadows and much more. Hopefully you can use this foundation to create awesome components in your React Native app!
