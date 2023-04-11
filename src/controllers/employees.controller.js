import { pool } from "../db.js";
export const getEmployees = async (req, res) => {
  try {
    const peticion = await pool.query("SELECT id,name,salary FROM employee");
    res.json(peticion[0]);
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error" });
  }
};
export const getEmployeesByID = async (req, res) => {
  try {
    const peticion = await pool.query(
      "SELECT id,name,salary FROM employee WHERE id=?",
      [req.params.id]
    );
    if (peticion[0].length == 1) return res.json(peticion[0]);
    res.status(404).json({ message: "Usuario no Existente" });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error" });
  }
};
export const postEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [peticion] = await pool.query(
      "INSERT INTO employee(name,salary) VALUES (?,?)",
      [name, salary]
    ); //devuelve un array y con los [] en peticion se vuelve solo un objeto
    res.json({
      id: peticion.insertId,
      name,
      salary,
    });
    console.log("Guardado exitoso");
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error" });
  }
};
//PARA EL USO DE PUT
// export const updateEmployees = async (req, res) => {
//   const { name, salary } = req.body;
//   const [peticion] = await pool.query(
//     "UPDATE employee SET name=?,salary=? WHERE id=?",
//     [name, salary, req.params.id]
//   );
//   if (peticion.changedRows <= 0)
//     return res.json({ message: "Empleado no encontrado" });
//   res.json({
//     id: req.params.id,
//     name,
//     salary,
//   });
//   console.log("Actualizado empleado");
// };

export const updateEmployees = async (req, res) => {
  //PARA EL USO DE PATCH
  const { name, salary } = req.body;
  try {
    const [peticion] = await pool.query(
      "UPDATE employee SET name=IFNULL(?,name),salary=IFNULL(?,salary) WHERE id=?",
      [name, salary, req.params.id] //asi modificamos solo una parte y no es necesario llenar todo
    );
    const [row] = await pool.query(
      "SELECT id,name,salary FROM employee WHERE id=?",
      [req.params.id]
    );
    if (peticion.changedRows <= 0)
      return res.json({ message: "Empleado no encontrado" });

    res.json(row[0]);
    console.log("Actualizado empleado");
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [peticion] = await pool.query("DELETE FROM employee WHERE id=?", [
      req.params.id,
    ]);
    if (peticion.affectedRows <= 0)
      return res.status(404).json({ message: "Usuarios No encontrado" });

    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error" });
  }
};
