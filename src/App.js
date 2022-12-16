import MUIDataTable from "mui-datatables";
import "./App.css";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { isValidPhoneNumber } from "react-phone-number-input";
import { getValue } from "@mui/system";
import { Metadata } from "libphonenumber-js";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,getValues,
    clearErrors,
  } = useForm({
    defaultValues: {
      film: {},
      film_options: {},
    },
  });

  const [open, setOpen] = useState(false);

  const [genderValue, setGenderValue] = useState();

  const [filmSelected, setFilmSelected] = useState([]);

  const [valPhoneNumber, setValPhonenumber] = useState();

  const [emplyeeData, setEmployee] = useState([
    {
      name: "Joe James",
      email: "Test@gmail.com",
      city: "Yonkers",
      phoneNumber: "911234567890",
      state: "washington",
    },
    {
      name: "John Walsh",
      email: "Test Corp@gmail.com",
      city: "berlin",
      phoneNumber: "911234567890",
      state: "stuggart",
    },
    {
      name: "Bob Herm",
      email: "shah@gmail.com",
      city: "melborne",
      phoneNumber: "911234567890",
      state: "sydney",
    },
    {
      name: "James Houston",
      email: "Testp@gmail.com",
      city: "newyork",
      phoneNumber: "911234567890",
      state: "chicago",
    },
  ]);

    //Edit section start 
  const onEditClick = (e) =>{
    //console.log(e);
    const rowid = e.rowIndex;
   // console.log(rowid);
    const edit = emplyeeData[rowid];
    setValue("name",edit.name);
    setValue("email",edit.email);
    setValue("city",edit.city);
    setValue("state",edit.state);
    setValue("phoneNumber",edit.phoneNumber);
    // console.log("phone",edit.phoneNumber)
    setValPhonenumber(edit.phoneNumber);
    setValue("isedit",1);
    setValue("id",rowid);
    setOpen(true);
  }
    const AddorEdit = getValues("isedit");
    const id = getValues("id");
    const onSubmit = (e) => {
    if(AddorEdit===1){
           emplyeeData[id]=e;
            setOpen(false);
        }        
   
      //Edit section end
      
       //Adding section start 
    else {
    //console.log(e);
    emplyeeData.push(e);
    setOpen(false);
  }
  //Adding section end


 

  

} 
 //delete section start     
    const onDeleteclick = (metaData)=>{

    setEmployee(emplyeeData.filter((_, index) => index !== metaData.rowIndex));
      };
       //delete section end

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "city",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "state",
      options: {
        filter: true,
        sort: false,
      },
      },
    {
          name: "phoneNumber",
          label: "phoneNumber",
          options: {
              filter: true,
              sort: false,
          }

    },
    {
      name: "edit",
      label: "edit",
      options: {
        filter: false,
        sort: false,
        //Edit button
        customBodyRender: (value, metaData) => (
          <Tooltip title="editIcon">
            <EditIcon onClick={() => onEditClick(metaData)} />
          </Tooltip>
        ),
      },
    },
    {
      name: "Delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        //Delete button
        customBodyRender: (value,metaData) => {
          return (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon onClick={() => onDeleteclick(metaData)} />
              </IconButton>
            </Tooltip>
          );
        },
      },
    },
  ];

  const top100Films = [
    {
      title: "The Shawshank Redemption",
      year: 1994,
    },
    {
      title: "The Godfather",
      year: 1972,
    },
    {
      title: "The lucifer",
      year: 2000,
    },
    {
      title: "Redemption",
      year: 1999,
    },
  ];
  const style = {
    position: "absolute",
    top: "0%",
    right: "0%",

    // transform: 'translate(-50%, -50%)',
    width: 400,
    height: "100%",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const AddButton = () => (
    <IconButton
      onClick={() => {
        setOpen(true);
      }}
    >
      <AddIcon />
    </IconButton>
  );
  const options = {
    filterType: "dropdown",
    customToolbar: AddButton,
  };

  const modalClose = () => {
    setOpen(false);
  };
  const onGenderSelect = (e) => {
    setValue("gender", e.target.value);
    setGenderValue(e.target.value);
  };
  const selectAutomatic = (e, options) => {
    setValue("film", options);
    setValue("film_options", options);
    setFilmSelected(options);
    //console.log(options);
  };
  const phone = (value, country, e, formattedValue, phoneNumber) => {
    // console.log(value, formattedValue, country, country.dialCode.length);

    if (
      !isValidPhoneNumber(formattedValue, country.countryCode) &&
      value.length > country.dialCode.length
    ) {
      setError(phoneNumber, {
        type: "validate",
        message: "phoneNumber is mandatory",
      });
    } else {
      clearErrors(phoneNumber);
    }
    setValue(phoneNumber, formattedValue);
  };

  const validatePhoneInput = (phone) => {
    if (phone) {
      isValidPhoneNumber(phone);
      return true;
    } else if (phone.length !== 10) {
      return false;
    } else {
      return false;
    }
  };

  return (
    <>
      <Modal open={open} onClose={modalClose}>
        <Box sx={style}>
          <form
            onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <label>
                    Name
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      aria-invalid={errors.Name ? "true" : "false"}
                    />
                  </label>
                  <p>{errors.Name?.message}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <label>
                    Email
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email Address is required",
                      })}
                      aria-invalid={errors.mail ? "true" : "false"}
                    />
                  </label>
                  <p>{errors.mail?.message}</p>
                </div>
              </div>
              <div className="col-md-12">
                <label>
                  countrystate
                  <input
                    {...register("state", {
                      required: "country state is required",
                    })}
                    type="text"
                    aria-invalid={errors.countrystate ? "true" : "false"}
                  />
                </label>
                <p>{errors.countrystate?.message}</p>
              </div>
              <div className="col-md-12">
                <label>
                  city
                  <input
                    {...register("city", { required: "city is required" })}
                    type="text"
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                </label>
                <p>{errors.city?.message}</p>
              </div>
              <div className="col-md-12">
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    onChange={onGenderSelect}
                    name="gender"
                    value={genderValue}
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio {...register("gender", { required: true })} />
                      }
                      label="female"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio {...register("gender", { required: true })} />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="Other"
                      control={
                        <Radio {...register("gender", { required: true })} />
                      }
                      label="Other"
                    />
                  </RadioGroup>
                  {errors?.gender?.type === "required" && (
                    <p className="error-line">Required</p>
                  )}{" "}
                </FormControl>
              </div>
              <div className="col-md-12">
                <Autocomplete
                  multiple
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[top100Films[1]]}
                  onChange={(e, options) => selectAutomatic(e, options)}
                  //{(e, options) =>
                  // setValue("movie",options);
                  //setValue("film_options", options);
                  //setFilmSelector(options);
                  //}
                  renderInput={(movie) => (
                    <TextField
                      {...movie}
                      label="Favorite films"
                      placeholder="Favorites"
                      {...register("film")}
                    />
                  )}
                  value={filmSelected}
                />
              </div>
              <div className="col-md-12">
                <PhoneInput
                  name="phoneNumber"
                  type="tel"
                  placeholder=""
                  errors={errors.phoneNumber ? "true" : "false"}
                  country={"in"}
                  {...register("phoneNumber", {
                    required: "phoneNumber mandatory",
                    minLength: {
                      value: 10,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                      validate: (value) => validatePhoneInput(value),
                    },
                  })}
                  onChange={(value, country, e, formattedValue) =>
                    phone(value, country, e, formattedValue, "phoneNumber")
                  }
                  value={valPhoneNumber}
                />
                <br />
              </div>
              <p>{errors.phoneNumber?.message}</p>
              <input type="submit" />
            </div>
          </form>
        </Box>
      </Modal>
      <MUIDataTable
        title={"Employee List"}
        data={emplyeeData}
        columns={columns}
        options={options}
      />
    </>
  );
}
export default App;
