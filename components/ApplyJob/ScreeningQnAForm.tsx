import { Box, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuestionnaireAnswerFormSchema } from '@utils/yup';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import theme from '@app/theme';
import { Input } from '@components/common/Input';

interface Props {
  formData: Partial<IApplicationForm> | null;
  jobData: IJob;
  setFormData: (data: Partial<IApplicationForm>) => void;
  setActiveSectionIndex: (index: number) => void;
}
const ScreeningQnAForm = (props: Props) => {
  const { formData, jobData, setFormData, setActiveSectionIndex } = props;
  console.log('formData', formData);
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<IQuestionnaireAnswerForm>({
    resolver: yupResolver(QuestionnaireAnswerFormSchema),
    defaultValues: {
      questionnaire: jobData?.questionnaire || [{ question: '', answer: '' }],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'questionnaire',
  });
  console.log(errors);
  const onSubmit: SubmitHandler<IQuestionnaireAnswerForm> = (data) => {
    console.log('submitted---', data);
    const temp = { ...formData, questionnaire: data.questionnaire };
    console.log(temp);
    setFormData(temp);
    setActiveSectionIndex(3);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.wrapper}>
        {fields.map((_, index) => (
          <Box sx={styles.formContainer} key={index}>
            <Input
              wrapperSx={{ flex: 1 }}
              name={`questionnaire[${index}].question`}
              type="text"
              label={`Question ${index + 1}`}
              placeholder="Explain your question"
              register={register}
              disabled
              error={errors.questionnaire?.[index]?.question?.message}
            />
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={styles.labelText}
              >{`Answer ${index + 1}`}</Typography>
              <TextField
                {...register(`questionnaire.${index}.answer`)}
                name={`questionnaire.${index}.answer`}
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="Explain the answer"
                sx={styles.textField}
              />
              {errors.questionnaire?.[index]?.answer?.message && (
                <Typography
                  sx={styles.error}
                  style={{
                    visibility: errors.questionnaire?.[index]?.answer?.message
                      ? 'visible'
                      : 'hidden',
                  }}
                >
                  {errors.questionnaire?.[index]?.answer?.message}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
        <Box sx={styles.buttonsWrapper}>
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
export default ScreeningQnAForm;
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
    justifyContent: 'flex-end',
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
