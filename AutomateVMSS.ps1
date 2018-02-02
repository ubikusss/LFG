$password = convertto-securestring "craq4pmfX2symOt+53G5I1iNOSh5UOTMpyadULemxQm07H0p/wkuXtNHo/77iIEQQ4Iw+YOJzttwCqLOVRelSQ==" -AsPlainText -Force
$cred = new-object System.Management.Automation.PSCredential -ArgumentList "Azure\sflogsteam303sf7589", $password
New-SmbGlobalMapping -RemotePath "\\sflogsteam303sf7589.file.core.windows.net\sfshare" -Credential $cred -LocalPath Z:
