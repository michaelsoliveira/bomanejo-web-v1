import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!'),
})

export const LoginForm = function LoginForm({ styles, parentShowLogin }: any) {

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form>
        <label className={styles.label} htmlFor='Email'>
          Email
        </label>
        <Field className={styles.field} id='email' name='email' />
        <ErrorMessage component='a' className={styles.errorMsg} name='email' />
        <label className={styles.label} htmlFor='Email'>
          Password
        </label>
        <Field className={styles.field} id='password' name='password' />
        <ErrorMessage
          component='a'
          className={styles.errorMsg}
          name='password'
        />
        <div className='mt-8'>
          <button type='submit' className={styles.button}>
            Login
          </button>
        </div>
      </Form>
    </Formik>
  )}