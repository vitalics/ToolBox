/* eslint-disable no-plusplus */
import { z } from 'zod';

function isCSVLike(input: string) {
  // Split the input into lines
  const lines = input.trim().split('\n');

  // Check if there are at least two lines
  if (lines.length < 2) {
    return false;
  }

  // Check if each line contains comma-separated values
  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < 2) {
      return false;
    }
  }
  // If all checks pass, assume it's CSV-like
  return true;
}
export const CSVSchema = z.string().refine(isCSVLike, {
  message: "String is not a csv-like",
})


function isTSVLike(input) {
  // Split the input into lines
  const lines = input.trim().split('\n');

  // Check if there are at least two lines
  if (lines.length < 2) {
    return false;
  }

  // Check if each line contains tab-separated values
  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split('\t');
    if (values.length < 2) {
      return false;
    }
  }

  // If all checks pass, assume it's TSV-like
  return true;
}

export const TSVSchema = z.string().refine(isTSVLike, {
  message: "String is not a csv-like",
});
