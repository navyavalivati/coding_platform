using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;

[ApiController]
[Route("api/execute")]
public class CodeExecutionController : ControllerBase
{
    [HttpPost]
    public IActionResult ExecuteCode([FromBody] CodeRequest request)
    {
        string output = RunCode(request.Code, request.Language, request.Input);
        return Ok(new { output });
    }

    private string RunCode(string code, string language, string input)
    {
        string tempPath = Path.GetTempPath();
        string fileName = $"temp_{Guid.NewGuid()}";
        string sourceFile = Path.Combine(tempPath, fileName) + GetFileExtension(language);
        string inputFile = sourceFile + ".input"; // Temporary input file
        string outputFile = sourceFile + ".output"; // Temporary output file
        string result = "";

        try
        {
            //Write the source code to a temporary file
            System.IO.File.WriteAllText(sourceFile, code);

            // Write user input to a separate file
            System.IO.File.WriteAllText(inputFile, input);

            if (language == "python")
            {
                result = ExecuteCommand(GetPythonCommand(sourceFile, inputFile, outputFile));
            }
            else if (language == "javascript")
            {
                result = ExecuteCommand(GetJsCommand(sourceFile, inputFile, outputFile));
            }
            else if (language == "java")
            {
                result = ExecuteCommand(GetJavaCommand(sourceFile, inputFile, outputFile, tempPath));
            }
            else if (language == "c")
            {
                result = ExecuteCommand(GetCCommand(sourceFile, inputFile, outputFile));
            }
            else if (language == "cpp")
            {
                result = ExecuteCommand(GetCppCommand(sourceFile, inputFile, outputFile));
            }
            else if (language == "csharp")
            {
                result = ExecuteCommand(GetCSharpCommand(sourceFile, inputFile, outputFile));
            }

            // Read output from the file (if it exists)
            return System.IO.File.Exists(outputFile) ? System.IO.File.ReadAllText(outputFile) : "Execution error!";
        }
        catch (Exception ex)
        {
            return $"Execution error: {ex.Message}";
        }
        finally
        {
            //Cleanup temporary files
            DeleteFile(sourceFile);
            DeleteFile(inputFile);
            DeleteFile(outputFile);
        }
    }

    private string ExecuteCommand(string command)
    {
        try
        {
            ProcessStartInfo psi = new ProcessStartInfo
            {
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            // Detect OS and set appropriate shell
            if (OperatingSystem.IsWindows())
            {
                psi.FileName = "cmd.exe";
                psi.Arguments = $"/c {command}";
            }
            else
            {
                psi.FileName = "/bin/bash";
                psi.Arguments = $"-c \"{command}\"";
            }

            using (Process process = new Process { StartInfo = psi })
            {
                process.Start();
                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();
                process.WaitForExit();

                if (!string.IsNullOrWhiteSpace(error))
                {
                    return $"Error: {error}";
                }

                return string.IsNullOrWhiteSpace(output) ? "Execution error or empty output" : output;
            }
        }
        catch (Exception ex)
        {
            return $"Exception: {ex.Message}";
        }
    }

    private void DeleteFile(string filePath)
    {
        try
        {
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"File deletion failed: {ex.Message}");
        }
    }

    private string GetFileExtension(string language)
    {
        return language switch
        {
            "python" => ".py",
            "javascript" => ".js",
            "java" => ".java",
            "c" => ".c",
            "cpp" => ".cpp",
            "csharp" => ".cs",
            _ => throw new ArgumentException("Unsupported language")
        };
    }

    private string GetPythonCommand(string sourceFile, string inputFile, string outputFile)
    {
        return $"python \"{sourceFile}\" < \"{inputFile}\" > \"{outputFile}\"";
    }

    private string GetJsCommand(string sourceFile, string inputFile, string outputFile)
    {
        return $"node \"{sourceFile}\" < \"{inputFile}\" > \"{outputFile}\"";
    }

    private string GetJavaCommand(string sourceFile, string inputFile, string outputFile, string tempPath)
    {
        string className = Path.GetFileNameWithoutExtension(sourceFile);
        return $"javac \"{sourceFile}\" && java -cp \"{tempPath}\" {className} < \"{inputFile}\" > \"{outputFile}\"";
    }

    private string GetCCommand(string sourceFile, string inputFile, string outputFile)
    {
        return $"gcc \"{sourceFile}\" -o \"{sourceFile}.exe\" && \"{sourceFile}.exe\" < \"{inputFile}\" > \"{outputFile}\"";
    }

    private string GetCppCommand(string sourceFile, string inputFile, string outputFile)
    {
        return $"g++ \"{sourceFile}\" -o \"{sourceFile}.exe\" && \"{sourceFile}.exe\" < \"{inputFile}\" > \"{outputFile}\"";
    }

    private string GetCSharpCommand(string sourceFile, string inputFile, string outputFile)
    {
        return $"csc -out:\"{sourceFile}.exe\" \"{sourceFile}\" && \"{sourceFile}.exe\" < \"{inputFile}\" > \"{outputFile}\"";
    }
}

public class CodeRequest
{
    public string Code { get; set; }
    public string Language { get; set; }
    public string Input { get; set; }
}
