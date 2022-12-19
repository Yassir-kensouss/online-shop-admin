import { Button, Dialog, InputText, Toast } from "primereact";
import React, { useEffect, useRef,useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { persistCategory, persistManyCategories } from "../../services/category";
import { addNewCategory, getCategries } from "../../store/categories";
import AddMany from "./AddMany";
import Papa from 'papaparse'
import { isCsvCategoryValid } from "../../utils/helpers";
import PropTypes from 'prop-types'

const AddCategory = props => {

  const { isModalOpen, setIsModalOpen, refetch } = props;

  const [hasFile,setHasFile] = useState(false)
  const [csvFile,setCsvFile] = useState(null)
  const [error, setError] = useState([]);

  const dispatch = useDispatch();
  const toast = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isError, isLoading, isSuccess, data } =
    useMutation(persistCategory);

  const addMany = useMutation(data => persistManyCategories(data))
  
  const onSubmit = (data, e) => {
    if(hasFile){
      Papa.parse(csvFile,{
        header:true,
        complete: (result) => {
          console.log('result', result)
          if(isCsvCategoryValid(result.data)){
            addMany.mutate(result.data);
          }else{
            setError('CSV file does not contain a valid column')
          }
        }
      })
    }else{
      mutate(data);
      e.target.reset();
    }
  };

  useEffect(() => {

    if(addMany.isSuccess){
      refetch()
      setHasFile(false);
      setCsvFile(null)
      setIsModalOpen(false);
    }

    if(addMany.isError){
      toast.current.show({
        severity: "error",
        detail: "Something went wrong, Please try again",
        life: 2000,
      });
    }

  },[addMany.isSuccess,addMany.isError])

  useEffect(() => {

    if(!isModalOpen){
      setError(null);
      setCsvFile(null);
      setHasFile(false)
    }

  },[isModalOpen])

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      refetch()
      toast.current.show({
        severity: "success",
        detail: "Category Added",
        life: 2000,
      });
      reset({});
    }

    if (isError) {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong, Please try again",
        life: 2000,
      });
    }
  }, [isError, isSuccess]);

  const validate = {
    required: {
      value: hasFile ? false : true,
      message: "category name is required.",
    },
    maxLength: {
      value: 30,
      message: "category name is too long",
    },
    minLength: {
      value: 4,
      message: "category name must be between 4 and 30",
    },
    pattern: {
      value: /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,
      message: "Only letters and numbers allowed",
    },
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Add Category"
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        closeOnEscape={true}
        ariaCloseIconLabel="close category dialog"
        className="addCategory"
        draggable={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" mt-2">
            <Controller
              name="name"
              control={control}
              rules={validate}
              render={({ field, value, fieldState }) => (
                <InputText
                  id={field.name}
                  disabled={hasFile}
                  {...field}
                  ref={field}
                  autoFocus
                  value={value}
                  placeholder="Add new category e.g. 'eBook'"
                  className={`w-full p-inputtext-sm ${
                    fieldState.invalid && !hasFile ? "p-invalid" : ""
                  }`}
                />
              )}
            />
          <AddMany setHasFile={setHasFile} setCsvFile={setCsvFile} setError={setError}/>
            <Button
              label={!isLoading ? "Add" : ""}
              className="p-button-sm border-round-md"
              loading={isLoading || addMany.isLoading}
            />
          </div>
          {errors.name && (
            <p className="mt-3 text-red-300 text-sm">{errors.name.message}</p>
          )}
          {error ? <p className="mt-3 mb-3 p-0 text-red-400 text-sm">{error}</p> : null }
          
        </form>
      </Dialog>
    </>
  );
};

export default AddCategory;

AddCategory.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
}