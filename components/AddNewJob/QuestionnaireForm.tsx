import theme from '@app/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { QuestionnaireFormSchema } from '@utils/yup';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '@components/common/Input';
import { Trash2 } from 'lucide-react';

interface Props {
  formData: Partial<IJob> | null;
  setFormData: (data: Partial<IJob>) => void;
  setActiveSectionIndex: (index: number) => void;
}

const QuestionnaireForm = (props: Props) => {
  const { formData, setFormData, setActiveSectionIndex } = props;
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<IQuestionnaireForm>({
    resolver: yupResolver(QuestionnaireFormSchema),
    defaultValues: {
      questionnaire: formData?.questionnaire || [{ question: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionnaire',
  });
  console.log(errors);
  const onSubmit: SubmitHandler<IQuestionnaireForm> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, questionnaire: data.questionnaire };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(5);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        {fields.map((_, index) => (
          <Box sx={styles.formContainer} key={index}>
            {index !== 0 && (
              <Box sx={styles.trashWrapper} onClick={() => remove(index)}>
                <Trash2 size={16} color="#358D9E" strokeWidth={1.5} />
              </Box>
            )}
            <Input
              wrapperSx={{ flex: 1 }}
              name={`questionnaire[${index}].question`}
              type="text"
              label={`Question ${index + 1}`}
              placeholder="Explain your question"
              register={register}
              error={errors.questionnaire?.[index]?.question?.message}
            />
          </Box>
        ))}
        <Button
          variant="text"
          onClick={() => append({ question: '' })}
          sx={styles.createButton}
          startIcon={<AddIcon fontSize="small" />}
        >
          More
        </Button>

        <Box sx={styles.buttonsWrapper}>
          <Button
            onClick={() => setActiveSectionIndex(3)}
            color="secondary"
            variant="outlined"
            sx={styles.back}
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={styles.next}
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
};
export default QuestionnaireForm;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    height: '100%',
    width: '650px',
    margin: 'auto',
  },
  formContainer: {
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: '1fr',
    gap: '8px',
    marginBottom: '8px',
    width: '100%',
  },
  trashWrapper: {
    position: 'absolute',
    right: 0,
    height: '21px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  formWrapper: {
    width: '100%',
  },
  or: {
    fontWeight: 600,
    fontSize: '0.75rem',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    marginTop: '15px',
    minWidth: '350px',
    width: '100%',
    mx: 'auto',
  },
  createButton: {
    fontWeight: 600,
    fontSize: '0.75rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  next: {
    width: '70px',
    height: '30px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  back: {
    width: '60px',
    height: '30px',
    borderWidth: '1.5px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  error: {
    fontSize: '12px',
    color: 'red',
    height: '18px',
  },
  labelText: {
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  textField: {
    borderRadius: '12px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.primary,
      fontSize: '0.8rem',
      fontWeight: '500',
      lineHeight: '24px',
      padding: '8px 10px',

      // Autofill styling
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
        caretColor: '#4A4A4A',
        borderRadius: 'inherit',
        fontFamily: 'inherit',
      },
      '& input:-webkit-autofill:focus': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
        WebkitTextFillColor: '#4A4A4A',
      },
      '& input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
      },
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #8B8B8B',
      outline: 'none',
    },
    '& .MuiFormHelperText-root': {
      lineHeight: '1',
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
};
