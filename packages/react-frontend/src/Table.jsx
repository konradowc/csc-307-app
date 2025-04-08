function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return (
    <tbody />
  );
}

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} />
      </table>
    );
}
export default Table;

