import './App.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

function App() {
  const [errorsMessage, SetErrorsMessage] = useState('');
  const throttledControlle = useRef(null);

  //Mit useFormik kann man testen, ob die fake URL mit "https://www." anfängt, wenn nicht , dann kriegt
  // der User eine Fehlermeldung, deswegen muss mann erstmal mit "https://www." anfangen, dann kann man
  //irgendwas eintippen, weil das Ergebnis sowie so fake ist und von der mockServerCheck kommt
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .url("URL ist ungültig bitte fange mit https://www.")
        .required("Du musst erstmal eine URL eintippen :)"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Die fake URL wird hier getestet. Das Ergebnis ist 50% existiert und 50% nicht existiert
  const mockServerCheck = async (nimmtDieUrlVonMockThrottle) => {
    return new Promise((result) => {
      const UrleExistiert = Math.random() > 0.5; //Die fake url 50% existiert  
      const UrlExistiertNicht = Math.random() > 0.5; //Die fake Url 50% existiert nicht
      result({ UrleExistiert, UrlExistiertNicht });
    });
  };

  useEffect(() => {
    //wenn throttledControlle.current definiert ist , wird die Prüfung begonnen, wenn es diesen Code Teil nicht gäbe,
    //würde throttled jedes mal gelöscht und neu erstellt werden, deswegen habe ich hier kontrolliert, ob 
    //throttledControlle.current true oder false ist und es muss false sein.
    if (!throttledControlle.current) {
      throttledControlle.current = throttle(async (SchicktDieUrlinMockServerCheck) => {
        //bei einer normalden get Api es dauert immer bis mann ein antwort bekommt, daher habe ich hier eine 
        //setTimeout funktion angelegt, um diese Verspätung zu imitieren
        setTimeout(async () => {
          const result = await mockServerCheck(SchicktDieUrlinMockServerCheck);
          SetErrorsMessage( result.UrleExistiert ? "Url existiert" : "Url existiert nicht");
        }, 300);
      }, 300);
    }

    // hier wird throttledControlle erstmal definiert und dann wird eingegebene URL mit dem richtigen
    // "https://www," Format geprüft
    if (formik.values.url && !formik.errors.url) {
      throttledControlle.current(formik.values.url);
    } else {
      SetErrorsMessage('');
    }
  }, [formik.values.url, formik.errors.url]);

  return (
    <div style={{ padding: '10px', fontFamily: 'sans-serif' }}>
      <h2>URL Checker</h2>

      <input
        name="url"
        type="text"
        placeholder="Url muss mit https://www. anfangen"
        value={formik.values.url}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ width: '400px', padding: '8px', borderRadius: '10px', height: '30px' }}
      />

      {formik.touched.url && formik.errors.url && (<p style={{ color: 'red', marginTop: '5px' }}>{formik.errors.url}</p>)}

      {errorsMessage && (<p style={{ marginTop: '10px' }}>{errorsMessage}</p>)}
    </div>
  );
}

export default App;
