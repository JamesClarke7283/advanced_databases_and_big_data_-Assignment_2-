import pandas as pd
import os
import argparse

def find_header_row(file_path, sheet_name, column_name):
    """
    Find the header row in the sheet by looking for the specified column name.
    """
    df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
    for i, row in df.iterrows():
        if column_name in row.values:
            return i
    return None

def load_and_process_table(file_path, sheet_name, column_name, match_column=None, match_values=None):
    print(f"Processing {sheet_name} from {file_path}...")
    
    # Find the header row using the specified column name
    header_row = find_header_row(file_path, sheet_name, column_name)
    if header_row is None:
        print(f"Error: Could not find the header row containing column '{column_name}' in sheet '{sheet_name}'.")
        return None
    
    # Load the data from the specified sheet starting from the header row
    df = pd.read_excel(file_path, sheet_name=sheet_name, header=header_row)
    
    # Print column names for debugging
    print(f"Columns in {sheet_name}: {df.columns.tolist()}")
    
    # Remove unnamed columns
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    # Remove duplicates
    df.drop_duplicates(inplace=True)
    
    # If match_column and match_values are provided, filter the dataframe
    if match_column and match_values is not None:
        initial_count = len(df)
        df = df[df[match_column].isin(match_values)]
        final_count = len(df)
        removed_count = initial_count - final_count
        print(f"Removed {removed_count} rows from {sheet_name} that do not match the given values.")
    
    return df

def main():
    parser = argparse.ArgumentParser(description='Clean data in an Excel file based on matching values between sheets.')
    parser.add_argument('input', help='Path to the input Excel file')
    parser.add_argument('--output', help='Path to the output CSV file')
    parser.add_argument('--src-sheet', required=True, help='Source sheet name')
    parser.add_argument('--dst-sheet', required=True, help='Destination sheet name')
    parser.add_argument('--src-column', required=True, help='Column to match in the source sheet')
    parser.add_argument('--dst-column', required=True, help='Column to match in the destination sheet')
    
    args = parser.parse_args()
    
    input_file = args.input
    output_file = args.output
    src_sheet = args.src_sheet
    dst_sheet = args.dst_sheet
    match_src_column = args.src_column
    match_dst_column = args.dst_column
    
    # Load and process the destination sheet to get the match values
    dst_df = load_and_process_table(input_file, dst_sheet, match_dst_column)
    if dst_df is None or match_dst_column not in dst_df.columns:
        print(f"Error: Column '{match_dst_column}' not found in sheet '{dst_sheet}'.")
        return
    
    match_values = dst_df[match_dst_column].dropna().tolist()
    
    # Load and process the source sheet using the match values from the destination sheet
    cleaned_src_df = load_and_process_table(input_file, src_sheet, match_src_column, match_column=match_src_column, match_values=match_values)
    if cleaned_src_df is None or match_src_column not in cleaned_src_df.columns:
        print(f"Error: Column '{match_src_column}' not found in sheet '{src_sheet}'.")
        return
    
    # Determine the output file name if not provided
    if not output_file:
        input_base_name = os.path.splitext(os.path.basename(input_file))[0]
        output_file = f"{input_base_name}_{src_sheet}_{dst_sheet}_Cleaned.csv"
    
    # Save the cleaned data to a CSV file, excluding unnamed columns
    cleaned_src_df.to_csv(output_file, index=False)
    print(f"Cleaned data saved to {output_file}")

if __name__ == "__main__":
    main()

