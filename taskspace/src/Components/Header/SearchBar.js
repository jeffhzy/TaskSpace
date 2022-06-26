import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', width: 400, marginRight: '20px'}}
    >
    
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search notes or people"
      />
      <IconButton type="submit" sx={{ p: '8px' }} aria-label="search" style={{outline:"none"}}>
        <SearchIcon />
      </IconButton>

    </Paper>
  );
}

export default SearchBar;