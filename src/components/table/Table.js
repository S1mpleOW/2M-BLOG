import React from 'react';
import styled from 'styled-components';
const TableStyles = styled.div`
	background-color: white;
	border-radius: 10px;
	table {
		width: 100%;
	}
	thead {
		background-color: #f7f7f8;
	}
	th,
	td {
		vertical-align: middle;
		white-space: nowrap;
	}
	th {
		padding: 20px 30px;
		font-weight: 600;
		text-align: left;
	}

	td {
		padding: 15px 30px;
	}
	tbody {
	}
	@media screen and (max-width: 767.98px) {
		& {
			overflow-x: auto;
		}
	}
`;
const Table = ({ children, ...props }) => {
	return (
		<TableStyles {...props}>
			<table>{children}</table>
		</TableStyles>
	);
};

export default Table;
