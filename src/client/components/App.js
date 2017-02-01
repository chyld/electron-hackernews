const React = require('react');
const ipc = require('electron').ipcRenderer
const {shell} = require('electron')


module.exports = class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {stories: []};
    this.top = this.top.bind(this);
    this.open = this.open.bind(this);
    ipc.on('top', this.top);
  }

  componentDidMount(){
    ipc.send('top');
  }

  top(event, stories){
    this.setState({stories});
  }

  open(e){
    const url = e.target.getAttribute('href');
    shell.openExternal(url);
    e.preventDefault();
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Electron: Dev News</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ul>
              {
                this.state.stories.map(s => 
                <li key={s.id}>
                  <a onClick={this.open} href={s.url}>{s.title}</a>
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
