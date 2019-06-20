import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField';
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
import {
  flagsUsed,
  invertFlag,
  showMines,
  hadExplosion,
  createMinedBoard,
  cloneBoard,
  openField,
  wonGame
} from './src/functions'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols*rows*params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return { won: false,
      lost: false,
      selectLevel: false,
      board: createMinedBoard(rows, cols, this.minesAmount()) }
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    this.setState({board})
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const won = wonGame(board)
    const lost = hadExplosion(board)

    if (lost) {
      Alert.alert('Voce perdeu!', 'Muito burro!')
      showMines(board)
    }
    if (won) {
      Alert.alert('Voce venceu!', 'Parabens!')
      showMines(board)
    }
    this.setState({ won, board, lost })
  }

  selectLevel = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection isVisible ={this.state.selectLevel}
          levelSelect={this.selectLevel}
          onCancel={() => this.setState({selectLevel: false})}/>
        <Header openSelection={() => this.setState({selectLevel: true})} 
        flagsLeft={this.minesAmount()-flagsUsed(this.state.board)} newGame ={() => this.setState(this.createState())}/>
        <View style={styles.board}>
          <MineField onSelectField={this.onSelectField} 
          onFieldOpen={this.onOpenField} board={this.state.board}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});
