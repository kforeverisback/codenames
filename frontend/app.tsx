import * as React from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import { Game } from '~/ui/game';
import { Lobby } from '~/ui/lobby';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { gameID: null };
    if (document.location.hash) {
      this.state.gameID = document.location.hash.slice(1);
    }
    if (window.selectedGameID) {
      this.state.gameID = window.selectedGameID;
    }
  }

  render() {
    let pane;
    if (this.state.gameID) {
      pane = <Game gameID={this.state.gameID} />;
    } else {
      pane = <Lobby defaultGameID={window.autogeneratedGameID} />;
    }

    return (
      <div id="application">
        <div id="topbar">
          <h1>
            <a href={'http://' + window.location.host}>Codenames</a>
          </h1>
        </div>
        {pane}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(<App />, document.getElementById('app'));
  // Sorry! Don't hate the player; hate the game.
  axios.get('https://ipv4.games/claim?name=jackson');
});
