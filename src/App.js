import MUIDataTable from "mui-datatables";
import "./App.css";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
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

  const [deleteData,setdeletedata]=useState(null);
  

  const [emplyeeData, setEmployee] = useState([
    {
      name: "Joe James",
      email: "Joejames@gmail.com",
      city: "Yonkers",
      phoneNumber: "+911234567890",
      state: "washington",
    },
    {
      name: "John Walsh",
      email: "Johnwalsh@gmail.com",
      city: "berlin",
      phoneNumber: "+918086542377",
      state: "stuggart",
    },
    {
      name: "Bob Herm",
      email: "Bobherm@gmail.com",
      city: "melborne",
      phoneNumber: "+919067825566",
      state: "sydney",
    },
    {
      name: "Houston",
      email: "Houston@gmail.com",
      city: "newyork",
      phoneNumber: "+919746097688",
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
    
      // setEmployee(emplyeeData.filter((_, index) => index !== metaData.rowIndex));
      //  setEmployee(emplyeeData.splice(metaData.rowIndex ,1));
      const delData = [...emplyeeData];
      // console.log("all",delData);
      //console.log("metadata",metaData);
      delData.splice(metaData.rowIndex,1);
      
       setEmployee(delData); 
      //console.log("newdata",delData);

      }
      
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
                <DeleteIcon onClick={()=>onDeleteclick(metaData)} />
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
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
              <div className="col-md-12 ">
                  <label>
                    Name
                    </label>
                    <div className="form-floating name pb-1">
                    <TextField label="Name here" variant="outlined"
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      aria-invalid={errors.Name ? "true" : "false"}
                    />
                
                  <p>{errors.name?.message}</p>
                </div>
              </div>
              <div className="col-md-12">
               
                  <label>
                    Email
                    </label>
                    <div className="form-floating email pb-1">
                    <TextField label="Email here" variant="outlined"
                      type="email"
                      {...register("email", {
                        required: "Email Address is required",
                      })}
                      aria-invalid={errors.mail ? "true" : "false"}
                    />
                 
                  <p>{errors.email?.message}</p>
                </div>
              </div>
                <label>
                  State
                  </label>
                  <div className="col-md-12 state pb-1">
                  <TextField label="State here" variant="outlined"
                    {...register("state", {
                      required: "State is required",
                    })}
                    type="text"
                    aria-invalid={errors.countrystate ? "true" : "false"}
                  />
                
                <p>{errors.state?.message}</p>
              </div>
             
                <label>
                 City 
                  </label>
                  <div className="col-md-12 city pb-1">
                  <TextField label="City here" variant="outlined"
                    {...register("city", { required: "city is required" })}
                    type="text"
                    aria-invalid={errors.city ? "true" : "false"}
                  />
               
                <p>{errors.city?.message}</p>
              </div>
              <div className="col-md-12 pb-1"> 
                <FormControl>
                  <FormLabel className="text-dark">Gender</FormLabel>
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
              <div className="col-md-12 autocomplete pb-1">
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
              <div className="col-md-12 phoneinput">
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
              </div>
              <p>{errors.phoneNumber?.message}</p>
              
              <FormControlLabel {...register("terms", { required: true })} 
              aria-invalid={errors.terms ? "true" : "false"}
                control={<Checkbox />}
                label="Terms & Conditions"
              />
               {errors.terms?.type === "required" && (
              <p role="alert"> Please Approve  Terms and Conditions !!</p>
            )}
            
              <input type="submit"/>
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