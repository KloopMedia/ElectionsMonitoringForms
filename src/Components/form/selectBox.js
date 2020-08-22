import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
}));

export default function SelectBox(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const index = props.index
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		setValue(event.target.value);
		props.returnAnswer(event.target.value, index)
	};

	const handleClose = (event) => {
		setOpen(false)
	};

	const handleOpen = (event) => {
		setOpen(true)
	}

	return (
		<div>
			<h4>{props.title}</h4>
			<FormControl className={classes.formControl}>
				<InputLabel id="controlled-open-select-label">Выбрать</InputLabel>
				<Select
					labelId="controlled-open-select-label"
					id="controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={value}
					onChange={handleChange}>
					<MenuItem value={""}><em>None</em></MenuItem>
					{props.answers.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
				</Select>
			</FormControl>
		</div>
	)

}