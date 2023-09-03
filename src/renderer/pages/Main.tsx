/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { increaseCount, setTheme, setThemeSelector } from '@/renderer/store/slices/appScreenSlice';
import { bodyRoot, jumbo } from '@/renderer/assets/css/global';
import type { RootState } from '@/renderer/store';
import trpcReact from '@/renderer/trpc';
import i18n from '../i18n';
import Update from '../components/update';

const Main = () => {
  const theme = useSelector(setThemeSelector);

  const counterValue = useSelector((state: RootState) => state.appScreen.counterValue);
  const [t] = useTranslation(['common']);
  const dispatch = useDispatch();

  const { data: version } = trpcReact.electron.version.useQuery();

  const handleChangeLocale = async (): Promise<void> => {
    await i18n.changeLanguage('de');
  };

  const handleChangeTheme = (): void => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  const handleIncreaseCount = (): void => {
    dispatch((increaseCount as any)());
  };

  return (
    <div css={bodyRoot}>
      <div css={jumbo}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={5}>
            <img id="main-logo" alt="logo" src="images/retron-logo.webp" draggable="false" />
          </Grid>
          <Grid item xs={7}>
            <h1>{t('hello-title')}</h1>
            <p>{t('hello-desc')}</p>
            <p>
              {t('using-version')} <strong>{version ?? ''}</strong>
            </p>
            <p>
              {t('count-value')}{' '}
              <span id="counter-value">
                <strong>{counterValue}</strong>
              </span>
            </p>
            <ButtonGroup variant="contained">
              <Button onClick={handleChangeLocale}>{t('Change Locale to DE')}</Button>
              <Button id="btn-change-theme" onClick={handleChangeTheme}>
                {theme === 'dark' ? '🌞' : '🌙'}
              </Button>
              <Button id="btn-counter" color="success" onClick={handleIncreaseCount}>
                +1
              </Button>
            </ButtonGroup>

            <Update />

            <Typography variant='h3'>
              Monaco editor:
            </Typography>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Main;
