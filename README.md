# React Native Layout Creator - RNLC

Read this in another languages: :fr: [Français](), :es: [Spañol](), [Português (BR)](https://github.com/Dssdiego/ReactNativeLayoutCreator/blob/master/README_ptbr.md)

**Sections of this document**

1. [Description](#description)
2. [Why?](#why)
3. [Development](#development)
4. [How it Works?](#work)
5. [How to Use?](#using)
6. [How to Contribute?](#contribute)
7. [Configuration](#configuration)

<a name="description"/>

## Description

This project aims to create React Native Layouts easy and fast, just by dropping components in a canvas.

After you create your layout visually, the software generates the React Native Code for you, automatically.

Cool, huh?

<a name="why"/>

## Why?

In the current days we have some tools for creating React Native Code, but we don't have a tool for creating layouts for your apps in an easy way, like UI Design.

So I tought that could be nice to have a software to do that.

Then RNLC (React Native Layout Creator) was born. :smiley:

<a name="development"/>

## Development

Thinking that the software should run in every machine out there (Linux, Mac, Windows), RNLC is being developed using the [Electron Framework](https://electron.atom.io/).

With that in mind, the software is all written using AngularJS, HTML and CSS.

<a name="work"/>

## How it works?

RNLC gets the components inside the canvas and "*translates*" the code to a file (localized on the **temp folder** of the project).

This file will contain the react native code for the layout.

See an example:

*Imagem mostrando componente de texto inserido*

Code generated:

```javascript
/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Component extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

<a name="using"/>

## How to Use

There are two ways to create layouts, which are:

1. From Scratch
2. Using templates

### From scratch

1. Create a new scene by clicking the "menu" and then "new scene"
2. Click on the component you want to insert
3. Change the component properties

#### Exporting Code

### Using Templates

To see the available templates, click on the "menu" and select Templates.

Then choose your template.

<a name="contibute"/>

## How To Contribute

> Soon...

<a name="configuration"/>

## Configuration

### Language

> Soon...

### Themes

> Soon...
