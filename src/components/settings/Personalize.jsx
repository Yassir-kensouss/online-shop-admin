import { Button, Dropdown, Toast, Tooltip } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { CURRENCIES, LANGUAGES } from "../../common/constants";
import {
  fetchGeneralSettings,
  updateGeneralSettings,
} from "../../services/settings";
import { updatePSettings } from "../../store/settings";
import SettingContentWrapper from "./SettingContentWrapper";
import WebsiteDescription from "./personalize/WebsiteDescription";
import WebsiteTitle from "./personalize/WebsiteTitle";

const Personalize = () => {
  const [brandName, setBrandName] = useState("");
  const [preview, setPreview] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [language, setLanguage] = useState(null);
  const [wDescription, setWDescription] = useState(null);
  const [wTitle, setWTitle] = useState(null);
  const [settings, setSettings] = useState(null);
  const [changes, setChanges] = useState({});

  const toast = useRef(null);
  const dispatch = useDispatch();

  const customBase64Uploader = async e => {
    const file = e.target.files[0];

    const avatar = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    avatar
      .then(data => {
        setPreview(data);
        setChanges({
          ...changes,
          brand: data,
        });
      })
      .catch(error => {
        console.log("error", error);
      });
    setBrandName(file.name);
  };

  const updateSettings = useMutation(data => updateGeneralSettings(data), {
    onSuccess: () => {
      dispatch(updatePSettings(changes));

      toast.current.show({
        severity: "success",
        detail: "Settings updated",
        life: 3000,
      });
    },

    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const { isLoading } = useQuery(
    "fetch-general-settings",
    async () => {
      const response = await fetchGeneralSettings();
      const data = await response.data.data;
      setSettings(data);
      setPreview(data.brand);
      setCurrency({
        name: data.currency.split("-")[0],
        code: data.currency.split("-")[1],
      });
      setLanguage({
        name: data.language.split("-")[0],
        code: data.language.split("-")[1],
      });
      setWDescription(data.websiteDescription);
      setWTitle(data.websiteTitle);
    },
    { refetchOnWindowFocus: false }
  );

  const clearBrand = () => {
    setPreview(null);
    setBrandName(null);
  };

  const onCurrencyChange = e => {
    setChanges({
      ...changes,
      currency: `${e.value.name}-${e.value.code}`,
    });
    setCurrency(e.value);
  };

  const onLanguageChange = e => {
    setChanges({
      ...changes,
      language: `${e.value.name}-${e.value.code}`,
    });
    setLanguage(e.value);
  };

  const saveChanges = () => {
    updateSettings.mutate({
      _id: settings._id,
      ...changes,
    });
  };

  return (
    <>
      <SettingContentWrapper
        title="Personalize"
        onSubmit={saveChanges}
        isLoading={updateSettings.isLoading}
      >
        <Toast ref={toast} />
        <div className="mt-4 w-full flex gap-2 align-items-center">
          <label className="sp-label" htmlFor="upload-brand">
            <Tooltip target=".brand-tooltip">
              <p className="w-10rem line-height-2">
                the recommended dimensions are: 120 x 40
              </p>
            </Tooltip>
            <div className="flex align-items-center gap-2">
              <span>Brand:</span>
              <i className="brand-tooltip pi pi-info-circle"></i>
            </div>
            <div>
              <div className="cursor-pointer mt-2 w-10rem h-3rem bg-indigo-50 border-round-md flex gap-3 align-items-center justify-content-start p-2">
                <i className="pi pi-upload text-indigo-800 font-semibold"></i>
                <span className="sp-brand-uploader-label text-sm">
                  Click to upload
                </span>
              </div>
              {brandName ? (
                <span className="block mt-2 text-sm text-800">{brandName}</span>
              ) : null}
              <input
                id="upload-brand"
                hidden
                type="file"
                onChange={customBase64Uploader}
              />
            </div>
          </label>
          {preview ? (
            <>
              <div className="mt-4" style={{ width: "30%" }}>
                <img
                  width="100%"
                  src={preview}
                  alt="brand preview"
                  title="brand preview"
                />
              </div>
              <Button
                className="mt-4 p-button-text p-button-text p-button-danger p-button-rounded"
                icon="pi pi-trash"
                onClick={clearBrand}
              />
            </>
          ) : null}
        </div>
        <div className="flex align-items-center gap-3 w-full">
          <div className="mt-4 w-full">
            <label className="sp-label" htmlFor="currency-dropdown">
              <div>Currency:</div>
              <Dropdown
                className="mt-2 w-full"
                id="currency-dropdown"
                value={currency}
                options={CURRENCIES}
                onChange={onCurrencyChange}
                optionLabel="name"
                placeholder="Select a Currency"
              />
            </label>
          </div>
          <div className="mt-4 w-full">
            <label className="sp-label" htmlFor="currency-dropdown">
              <div>Language:</div>
              <Dropdown
                className="mt-2 w-full"
                id="language-dropdown"
                value={language}
                options={LANGUAGES}
                onChange={onLanguageChange}
                optionLabel="name"
                placeholder="Select a Language"
              />
            </label>
          </div>
        </div>
        <WebsiteDescription
          setWDescription={setWDescription}
          wDescription={wDescription}
          changes={changes}
          setChanges={setChanges}
        />
        <WebsiteTitle
          setWTitle={setWTitle}
          wTitle={wTitle}
          changes={changes}
          setChanges={setChanges}
        />
      </SettingContentWrapper>
    </>
  );
};

export default Personalize;
