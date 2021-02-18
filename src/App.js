import './App.css';
import TableExtension from "./components/Table/Table.component";
import styled from 'styled-components';

const AppContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
`;


function App() {
    return (
      <AppContainer className="App">
        <header className="App-header">
          <TableExtension></TableExtension>
        </header>
      </AppContainer>
    );
}



export default App;
