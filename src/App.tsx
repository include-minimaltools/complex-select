import axios from "axios";
import { useEffect, useState } from "react";
import { DropdownList } from "react-widgets";
import { Año, Marca, Modelo } from "./models";

export type FormProps = {
  marca?: number;
  modelo?: number;
  año?: number;
};

function App() {
  const [form, setForm] = useState<FormProps>();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [años, setAños] = useState<Año[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("form-data");
    if (data) setForm(JSON.parse(data));
  }, []);

  useEffect(() => {
    axios("marcas.json").then(({ data }) => setMarcas(data));
  }, []);

  useEffect(() => {
    axios<Modelo[]>("modelos.json").then(({ data }) =>
      setModelos(data.filter(({ marca_id }) => marca_id === form?.marca))
    );
  }, [form?.marca]);

  useEffect(() => {
    axios<Año[]>("años.json").then(({ data }) =>
      setAños(data.filter(({ modelo_id }) => modelo_id === form?.modelo))
    );
  }, [form?.modelo]);

  const guardarInformacion = () => {
    localStorage.setItem("form-data", JSON.stringify(form));
  };

  const borrarInformacion = () => {
    localStorage.removeItem("form-data");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div>
          <label>Marca</label>
          <DropdownList
            value={form?.marca ?? ""}
            dataKey={"id"}
            textField={"nombre"}
            data={marcas}
            onChange={(e) => {
              setForm({ marca: e.id, modelo: undefined, año: undefined });
            }}
          />
        </div>
        <div>
          <label>Modelo</label>
          <DropdownList
            value={form?.modelo ?? ""}
            dataKey={"id"}
            textField={"nombre"}
            data={modelos}
            onChange={(e) => {
              setForm((state) => ({ ...state, modelo: e.id, año: undefined }));
            }}
          />
        </div>

        <div>
          <label>Año</label>
          <DropdownList
            value={form?.año ?? ""}
            dataKey={"id"}
            textField={"año"}
            data={años}
            onChange={(e) => {
              setForm((state) => ({ ...state, año: e.id }));
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={borrarInformacion}>Borrar info</button>
          <button onClick={guardarInformacion}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
