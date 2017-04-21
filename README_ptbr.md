# React Native Layout Creator - RNLC

Leia em outras línguas: :fr: [Francês](), :es: [Espanhol](), :us: [Inglês](https://github.com/Dssdiego/ReactNativeLayoutCreator)

## Descrição

Este projeto tem como objetivo criar layouts de React Native de forma fácil e rápida, simplesmente deixando componentes em uma tela.

Depois de criar o layout visualmente, o software gera o código para você, automaticamente.

Legal, né?

## Por quê?

Nos dias atuais, temos algumas ferramentas para criar Reative Native Code, mas não temos uma ferramenta para criar layouts para seus aplicativos de uma maneira fácil, como o Design de UI's.

Então eu pensei que poderia ser bom ter um software para fazer isso.

Então RNLC (React Native Layout Creator) nasceu. :smiley:

## Como funciona?

RNLC obtém os componentes dentro da tela e "traduz" o código para um arquivo (localizado na pasta **temp** do projeto).

Este arquivo conterá o código do layout criado.

Veja um exemplo:

*Imagem mostrando componente de texto inserido*

Código gerado:

```javascript
/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class MainScreen extends Component {
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

## Como Contribuir?

> Em Breve...
