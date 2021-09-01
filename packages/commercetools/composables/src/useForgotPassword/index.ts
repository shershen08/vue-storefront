import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';
import { ForgotPasswordResult } from '../types';
import {graphQLError} from '../helpers/internals';

const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<ForgotPasswordResult> = {
  resetPassword: async (context: Context, { email, currentResult, customQuery }) => {
    try {
      const resetPasswordResult = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
      return {
        ...currentResult,getCtErrorMessage
        resetPasswordResult
      };
    } catch (err) {
      err.message = graphQLError(err);
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }

  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, currentResult, customQuery }) => {
    try {
      const setNewPasswordResult = await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
      return {
        ...currentResult,
        setNewPasswordResult
      };
    } catch (err) {
      err.message = graphQLError(err);
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }
  }
};

const useForgotPassword: () => UseForgotPassword<ForgotPasswordResult> = useForgotPasswordFactory<ForgotPasswordResult>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
