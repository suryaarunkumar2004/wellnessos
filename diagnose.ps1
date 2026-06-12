Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  WELLNESSOS FRONTEND – COMPREHENSIVE PROBLEM REPORT" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check for missing page components
$requiredPages = @("Appointments","Calendar","HealthReports","Leaderboard","Services","Profile")
$missingPages = @()
foreach ($page in $requiredPages) {
    if (-not (Test-Path "src\pages\$page.jsx")) { $missingPages += $page }
}
if ($missingPages) {
    Write-Host "[ERROR] Missing page components:" -ForegroundColor Red
    $missingPages | ForEach-Object { Write-Host "  - src\pages\$_.jsx" -ForegroundColor Red }
} else {
    Write-Host "[OK] All 6 core page components exist." -ForegroundColor Green
}

# 2. Check for additional pages referenced in navbar (billing, insurance, etc.)
$extraPages = @("Billing","Insurance","Settings","Help","Terms","Privacy","Feedback","Refer","Blog","Support","Community","Store","Telehealth","Coaching","Reminders","Family")
$missingExtra = @()
foreach ($page in $extraPages) {
    if (-not (Test-Path "src\pages\$page.jsx")) { $missingExtra += $page }
}
if ($missingExtra) {
    Write-Host ""
    Write-Host "[WARNING] Navbar 'More' dropdown links missing pages:" -ForegroundColor Yellow
    $missingExtra | ForEach-Object { Write-Host "  - src\pages\$_.jsx (will lead to 404)" -ForegroundColor Yellow }
}

# 3. Check for syntax errors in each JSX file (simple regex)
Write-Host ""
Write-Host "[CHECK] Scanning for syntax errors in existing pages..." -ForegroundColor Cyan
$syntaxErrors = @()
$pagesToCheck = $requiredPages + $extraPages
foreach ($page in $pagesToCheck) {
    $file = "src\pages\$page.jsx"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
        if (-not $content) { continue }
        # Common JSX syntax issues
        if ($content -match 'className=\{\s*$' -or $content -match 'className=\\{[^}]*$') { $syntaxErrors += "$page: Unclosed brace in className attribute" }
        if ($content -match 'className="[^"]*\$' -and $content -notmatch '`') { $syntaxErrors += "$page: Dollar sign without template literal in className" }
        if ($content -match '<[A-Z][a-z]*[^>]*$' -and $content -notmatch '>') { $syntaxErrors += "$page: Possibly unclosed JSX tag near end of file" }
        if ($content -match 'export default \w+;?\s*$' -and $content -notmatch 'export default') { $syntaxErrors += "$page: Missing or malformed export default" }
        # Check for missing closing tags (very basic)
        $openCount = [regex]::Matches($content, '<[A-Z]\w+[^>]*>').Count
        $closeCount = [regex]::Matches($content, '</[A-Z]\w+>').Count
        if ($openCount -ne $closeCount) { $syntaxErrors += "$page: Unmatched JSX tags (opens: $openCount, closes: $closeCount)" }
    }
}
if ($syntaxErrors) {
    Write-Host "[ERROR] Syntax issues found:" -ForegroundColor Red
    $syntaxErrors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
} else {
    Write-Host "[OK] No obvious syntax errors in existing page files." -ForegroundColor Green
}

# 4. Check App.jsx routes
Write-Host ""
$appJsx = Get-Content "src\App.jsx" -Raw -ErrorAction SilentlyContinue
if ($appJsx) {
    $definedRoutes = [regex]::Matches($appJsx, "<Route path=['""]([^'""]+)['""]") | ForEach-Object { $_.Groups[1].Value }
    $expectedRoutes = @("/", "/doctors", "/tracker", "/prescriptions", "/triage", "/dosage", "/appointments", "/calendar", "/reports", "/leaderboard", "/services", "/profile")
    $missingRoutes = $expectedRoutes | Where-Object { $_ -notin $definedRoutes }
    if ($missingRoutes) {
        Write-Host "[ERROR] Routes missing in App.jsx:" -ForegroundColor Red
        $missingRoutes | ForEach-Object { Write-Host "  - $_ (will cause blank page)" -ForegroundColor Red }
    } else {
        Write-Host "[OK] All expected routes are defined." -ForegroundColor Green
    }
    # Check for duplicate routes or incorrect imports
    if ($appJsx -notmatch "import Appointments from") { Write-Host "[WARNING] Appointments component not imported in App.jsx" -ForegroundColor Yellow }
    if ($appJsx -notmatch "import Calendar from") { Write-Host "[WARNING] Calendar component not imported in App.jsx" -ForegroundColor Yellow }
    if ($appJsx -notmatch "import HealthReports from") { Write-Host "[WARNING] HealthReports component not imported in App.jsx" -ForegroundColor Yellow }
    if ($appJsx -notmatch "import Leaderboard from") { Write-Host "[WARNING] Leaderboard component not imported in App.jsx" -ForegroundColor Yellow }
    if ($appJsx -notmatch "import Services from") { Write-Host "[WARNING] Services component not imported in App.jsx" -ForegroundColor Yellow }
    if ($appJsx -notmatch "import Profile from") { Write-Host "[WARNING] Profile component not imported in App.jsx" -ForegroundColor Yellow }
} else {
    Write-Host "[ERROR] src/App.jsx not found!" -ForegroundColor Red
}

# 5. Check Navbar.jsx for correct dropdown links
Write-Host ""
$navbar = Get-Content "src\components\Navbar.jsx" -Raw -ErrorAction SilentlyContinue
if ($navbar) {
    $navLinks = [regex]::Matches($navbar, "to=['""]([^'""]+)['""]") | ForEach-Object { $_.Groups[1].Value }
    $expectedNavLinks = @("/", "/doctors", "/tracker", "/prescriptions", "/triage", "/dosage", "/appointments", "/calendar", "/reports", "/leaderboard", "/services", "/profile")
    $missingNavLinks = $expectedNavLinks | Where-Object { $_ -notin $navLinks }
    if ($missingNavLinks) {
        Write-Host "[ERROR] Navbar missing links for:" -ForegroundColor Red
        $missingNavLinks | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    } else {
        Write-Host "[OK] Navbar contains all required links." -ForegroundColor Green
    }
    # Check for More dropdown existence
    if ($navbar -notmatch "More") { Write-Host "[ERROR] Navbar missing 'More' dropdown button" -ForegroundColor Red }
    if ($navbar -notmatch "moreLinks") { Write-Host "[WARNING] Navbar 'moreLinks' array may be missing or incomplete" -ForegroundColor Yellow }
} else {
    Write-Host "[ERROR] src/components/Navbar.jsx not found!" -ForegroundColor Red
}

# 6. Check node_modules and dependencies
Write-Host ""
if (Test-Path "node_modules") {
    Write-Host "[OK] node_modules folder exists." -ForegroundColor Green
} else {
    Write-Host "[ERROR] node_modules missing. Run 'npm install'" -ForegroundColor Red
}
$package = $null
if (Test-Path "package.json") {
    $package = Get-Content "package.json" -Raw | ConvertFrom-Json
    $requiredDeps = @("react-router-dom", "react-toastify", "recharts")
    $missingDeps = @()
    foreach ($dep in $requiredDeps) {
        if (-not ($package.dependencies.PSObject.Properties.Name -contains $dep -or $package.devDependencies.PSObject.Properties.Name -contains $dep)) {
            $missingDeps += $dep
        }
    }
    if ($missingDeps) {
        Write-Host "[ERROR] Missing dependencies in package.json:" -ForegroundColor Red
        $missingDeps | ForEach-Object { Write-Host "  - $_ (run 'npm install $_')" -ForegroundColor Red }
    } else {
        Write-Host "[OK] All required dependencies are listed in package.json." -ForegroundColor Green
    }
} else {
    Write-Host "[ERROR] package.json not found!" -ForegroundColor Red
}

# 7. Check for console errors by simulating a build (optional, but useful)
Write-Host ""
Write-Host "[INFO] To see runtime errors, run 'npm run dev' and open browser console (F12)." -ForegroundColor Cyan
Write-Host "[INFO] Common runtime errors to look for:" -ForegroundColor Cyan
Write-Host "  - 'Cannot read properties of undefined' (missing data in localStorage)" -ForegroundColor Cyan
Write-Host "  - 'Failed to fetch' (if using API calls without backend)" -ForegroundColor Cyan
Write-Host "  - 'Warning: Each child in a list should have a unique key' (missing key props)" -ForegroundColor Cyan

# 8. List known architectural problems from development history
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  KNOWN ARCHITECTURAL & FUNCTIONAL PROBLEMS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "1. [CRITICAL] No real backend – all data stored in browser localStorage." -ForegroundColor Red
Write-Host "   → Data will be lost if user clears browser data. No user sync across devices." -ForegroundColor Red
Write-Host "2. [CRITICAL] No authentication – fake 'logout' button does nothing. No real user accounts." -ForegroundColor Red
Write-Host "3. [HIGH] Many 'More' dropdown links (Billing, Insurance, etc.) have no corresponding pages." -ForegroundColor Yellow
Write-Host "   → Clicking them will show blank/error pages unless you create the components." -ForegroundColor Yellow
Write-Host "4. [MEDIUM] Recurring appointments generate only 4 instances, not indefinite." -ForegroundColor Yellow
Write-Host "5. [MEDIUM] File uploads (attachments) store base64 in localStorage – can exceed storage limits." -ForegroundColor Yellow
Write-Host "6. [LOW] Real-time notifications are mocked with setInterval (not actual WebSockets)." -ForegroundColor Cyan
Write-Host "7. [LOW] Import/Export of ICS/CSV works but only for demo data; no server validation." -ForegroundColor Cyan
Write-Host "8. [INFO] All pages use mock data. To become production-ready, replace with API calls." -ForegroundColor Cyan
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS TO RESOLVE PROBLEMS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "1. Run 'npm install' if dependencies missing." -ForegroundColor White
Write-Host "2. Create missing page components (Billing, Insurance, etc.) or remove them from navbar." -ForegroundColor White
Write-Host "3. Replace localStorage with a real backend (Node.js + MongoDB)." -ForegroundColor White
Write-Host "4. Implement proper authentication (JWT, login/signup)." -ForegroundColor White
Write-Host "5. Add error boundaries to catch runtime errors." -ForegroundColor White
Write-Host "6. Run 'npm run build' to check for production build errors." -ForegroundColor White
Write-Host ""
Write-Host "Diagnostic complete." -ForegroundColor Green
